import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { shareholder_id, email, name } = await req.json();

    if (!shareholder_id || !email) {
      throw new Error("Missing shareholder_id or email");
    }

    console.log(`Generating OTP for shareholder: ${shareholder_id}, email: ${email}`);

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Hash the OTP for storage
    const encoder = new TextEncoder();
    const data = encoder.encode(otp);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const otpHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    // 3. Store OTP and Expiry in Database
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in Supabase Edge Function environment.");
    }

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Shareholder Login OTP</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #020817; margin: 0; padding: 20px; color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #0d1b2a; border-radius: 20px; padding: 36px; border: 1px solid rgba(255, 255, 255, 0.15); box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
    
    <div style="text-align: center; margin-bottom: 28px;">
      <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); border-radius: 14px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
        <span style="color: white; font-size: 26px; font-weight: bold;">🔒</span>
      </div>
      <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 6px; font-weight: 800;">Vote India Secure</h1>
      <p style="color: #94a3b8; font-size: 13px; margin: 0;">Two-Factor Voter Authentication</p>
    </div>

    <h2 style="color: #f8fafc; font-size: 18px; margin-top: 0; margin-bottom: 16px;">Hello ${name || "Valued Shareholder"},</h2>
    
    <p style="color: #cbd5e1; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
      To securely verify your identity and access your electronic voting ballot, please enter the one-time passcode (OTP) below:
    </p>

    <div style="background-color: #020817; border-radius: 12px; padding: 20px; text-align: center; border: 1px solid #0284c7; margin: 24px 0;">
      <span style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 800; color: #38bdf8; letter-spacing: 10px; display: inline-block;">${otp}</span>
    </div>
    
    <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 10px; padding: 12px; margin-top: 20px;">
      <p style="color: #7dd3fc; font-size: 12px; margin: 0; line-height: 1.5;">
        ⏱️ <strong>Valid for 10 minutes.</strong> Never share this code with anyone.
      </p>
    </div>

    <div style="text-align: center; margin-top: 28px; border-top: 1px solid rgba(255, 255, 255, 0.1); pt: 16px;">
      <p style="color: #64748b; font-size: 11px; margin: 16px 0 0;">
        © 2026 Vote India Secure · Enterprise E-Voting SaaS · Mumbai, India
      </p>
    </div>
  </div>
</body>
</html>
    `;

    // 1. Update DB OTP
    const updatePromise = supabaseAdmin
      .from("shareholders")
      .update({
        otp_code: otpHash,
        otp_expiry: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      })
      .eq("id", shareholder_id);

    // 2. Email sending with domain fallback
    const emailPayload = {
      from: "Vote India Secure <notifications@shareholdervoting.in>",
      to: [email],
      subject: "Your Secure Login OTP — Vote India Secure",
      headers: {
        "X-Priority": "1",
        "Importance": "high",
        "X-Entity-Ref-ID": `otp-${shareholder_id}`
      },
      html: htmlContent,
    };

    let emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      const errorJson = await emailResponse.clone().json().catch(() => null);
      console.warn("Primary OTP sender failed, falling back to onboarding@resend.dev:", errorJson);
      if (
        errorJson?.message?.toLowerCase().includes("domain") ||
        errorJson?.name === "validation_error" ||
        emailResponse.status === 403
      ) {
        emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            ...emailPayload,
            from: "Vote India Secure <onboarding@resend.dev>",
          }),
        });
      }
    }

    const [updateResult] = await Promise.all([updatePromise]);

    if (updateResult.error) {
      console.error("Database update error:", updateResult.error);
      throw new Error(`Failed to store OTP: ${updateResult.error.message}`);
    }

    const emailData = await emailResponse.json();
    if (!emailResponse.ok) {
      throw new Error(emailData.message || "Failed to deliver OTP email");
    }

    return new Response(
      JSON.stringify({ success: true, message: "OTP sent successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    console.error("Error in send-shareholder-otp-email function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
