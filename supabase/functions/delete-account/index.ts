import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.47.10";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing Authorization header");

    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !user) throw new Error("Invalid or expired authentication session");

    const userId = user.id;
    console.log(`Processing complete deregistration for user: ${userId}`);

    // 1. Find the company_id associated with this admin
    const { data: adminRecord } = await supabaseAdmin
      .from("company_admins")
      .select("company_id")
      .eq("user_id", userId)
      .maybeSingle();

    const companyId = adminRecord?.company_id;

    if (companyId) {
      console.log(`Purging all database records for company_id: ${companyId}`);

      // Find all voting sessions for this company
      const { data: sessions } = await supabaseAdmin
        .from("voting_sessions")
        .select("id")
        .eq("company_id", companyId);

      const sessionIds = (sessions || []).map((s) => s.id);

      // Find all shareholders for this company
      const { data: shareholders } = await supabaseAdmin
        .from("shareholders")
        .select("id")
        .eq("company_id", companyId);

      const shareholderIds = (shareholders || []).map((sh) => sh.id);

      // 2. Cascade delete dependent voting artifacts
      if (sessionIds.length > 0) {
        // Delete block anchors
        await supabaseAdmin.from("block_anchors").delete().in("session_id", sessionIds);

        // Delete votes
        await supabaseAdmin.from("votes").delete().in("voting_session_id", sessionIds);

        // Find and delete nominees for all resolutions of these sessions
        const { data: resolutions } = await supabaseAdmin
          .from("resolutions")
          .select("id")
          .in("voting_session_id", sessionIds);

        const resolutionIds = (resolutions || []).map((r) => r.id);

        if (resolutionIds.length > 0) {
          await supabaseAdmin.from("nominees").delete().in("resolution_id", resolutionIds);
          await supabaseAdmin.from("resolutions").delete().in("id", resolutionIds);
        }

        // Delete shareholder feedback
        await supabaseAdmin.from("shareholder_feedback").delete().in("session_id", sessionIds);

        // Delete voting sessions
        await supabaseAdmin.from("voting_sessions").delete().in("id", sessionIds);
      }

      // 3. Delete proxy delegations & shareholders
      if (shareholderIds.length > 0) {
        await supabaseAdmin.from("proxy_delegations").delete().in("shareholder_id", shareholderIds);
        await supabaseAdmin.from("shareholders").delete().in("id", shareholderIds);
      }

      // 4. Delete company admins
      await supabaseAdmin.from("company_admins").delete().eq("company_id", companyId);

      // 5. Delete company profile
      await supabaseAdmin.from("companies").delete().eq("id", companyId);
    }

    // 6. Delete admin user from Supabase auth.users
    const { error: deleteAuthError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (deleteAuthError) {
      console.warn("Warning deleting auth user:", deleteAuthError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Company and all associated records permanently purged." 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error in delete-account edge function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
