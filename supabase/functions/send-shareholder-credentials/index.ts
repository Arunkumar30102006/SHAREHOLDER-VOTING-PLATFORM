import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface CredentialsEmailRequest {
  type?: "credentials" | "otp" | "login_otp" | "deregistration_otp";
  shareholderEmail?: string;
  email?: string;
  shareholderName?: string;
  companyName: string;
  loginId?: string;
  password?: string;
  otp?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      type = "credentials",
      shareholderEmail,
      email,
      shareholderName,
      companyName,
      loginId,
      password,
      otp
    }: CredentialsEmailRequest = await req.json();

    const targetEmail = (email || shareholderEmail || "").trim();

    if (!targetEmail || !companyName) {
      throw new Error("Missing email or company name");
    }

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY secret is missing in Supabase Edge Functions environment.");
      throw new Error("Email service is temporarily unconfigured. Please configure RESEND_API_KEY.");
    }

    console.log(`Processing ${type} email for ${targetEmail}`);

    let subject = "";
    let html = "";
    let text = "";

    if (type === "deregistration_otp") {
      if (!otp) throw new Error("OTP is required");
      subject = `Deregistration Verification Code - ${companyName}`;
      text = `Deregistration Request for ${companyName}\n\nYour OTP is: ${otp}\n\nValid for 10 minutes. If you did not request this, please contact support immediately.`;
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Deregistration Request</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 20px; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #ef4444;">
            <h2 style="color: #ef4444; margin-top: 0;">⚠️ Deregistration Request</h2>
            <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">You have requested to deregister <strong>${companyName}</strong> on the Vote India Secure platform.</p>
            <p style="color: #fca5a5; font-size: 14px; line-height: 1.6;">This action will <strong>permanently delete</strong> all company data, including shareholders, resolutions, and audit records.</p>
            <p style="color: #cbd5e1; font-size: 14px;">Use the following OTP to confirm this action:</p>
            <div style="background-color: #0f172a; border-radius: 8px; padding: 18px; text-align: center; border: 1px solid #ef4444; margin: 24px 0;">
              <span style="font-family: 'Courier New', monospace; font-size: 32px; font-weight: 700; color: #f87171; letter-spacing: 8px;">${otp}</span>
            </div>
            <p style="color: #94a3b8; font-size: 12px;">This code expires in 10 minutes. If you did not request this, please contact support immediately.</p>
          </div>
        </body>
        </html>
      `;
    } else if (type === "login_otp" || type === "otp") {
      // Company Admin Login OTP
      if (!otp) throw new Error("OTP is required");
      subject = `Login Verification Code - ${companyName}`;
      text = `Admin Login Verification - ${companyName}\n\nYour One-Time Password is: ${otp}\n\nValid for 10 minutes. Never share this OTP with anyone.\n\nVote India Secure Enterprise Platform`;
      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login Verification Code</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #020817; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); border-radius: 14px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
                <span style="color: white; font-size: 26px; font-weight: bold;">🔒</span>
              </div>
              <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 6px; font-weight: 800;">Vote India Secure</h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">Enterprise Shareholder E-Voting Platform</p>
            </div>

            <div style="background: linear-gradient(135deg, #0d1b2a 0%, #0b1523 100%); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px; padding: 36px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
              <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 12px; font-weight: 700;">Admin Login Verification</h2>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                You are logging into the Administrator Portal for <strong style="color: #38bdf8;">${companyName}</strong>. Please use the one-time verification code below to authenticate your session:
              </p>

              <div style="background: #020817; border: 1px solid #0284c7; border-radius: 12px; padding: 20px; text-align: center; margin: 28px 0; box-shadow: inset 0 2px 4px rgba(0,0,0,0.6);">
                <span style="font-family: 'Courier New', monospace; font-size: 36px; font-weight: 800; color: #38bdf8; letter-spacing: 10px; display: inline-block;">
                  ${otp}
                </span>
              </div>

              <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.25); border-radius: 10px; padding: 14px; margin-top: 24px;">
                <p style="color: #7dd3fc; font-size: 12px; margin: 0; line-height: 1.5;">
                  ⏱️ <strong>Valid for 10 minutes.</strong> Never share this OTP with anyone. If you did not attempt to sign in to ${companyName}, please secure your account credentials immediately.
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 28px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2026 Vote India Secure · Bandra Kurla Complex (BKC), Mumbai, India<br>
                Automated security notification · Do not reply directly to this email
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    } else {
      // Default: Shareholder Credentials
      if (!shareholderName || !loginId || !password) throw new Error("Missing credentials fields");
      subject = `Statutory E-Voting Notice & Credentials: ${companyName}`;
      
      // Plain text fallback (essential for Outlook/Exchange deliverability)
      text = `Hello ${shareholderName},\n\nYou have been registered on the electronic voting roster for ${companyName}.\n\nYour confidential e-voting credentials:\n- VOTING USER ID: ${loginId}\n- SECURITY PIN: ${password}\n\nAccess the portal to cast your ballot:\nhttps://www.shareholdervoting.in/shareholder-login\n\nStatutory Notice (Companies Act Rule 20):\nYour vote is encrypted with AES-256 and decoupled from your identity. Under statutory regulations, voting choices are permanent once cast.\n\nVote India Secure Enterprise Platform`;

      html = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>E-Voting Credentials</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #020817; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="width: 56px; height: 56px; background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); border-radius: 14px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
                <span style="color: white; font-size: 26px; font-weight: bold;">🗳️</span>
              </div>
              <h1 style="color: #ffffff; font-size: 24px; margin: 0 0 6px; font-weight: 800;">Vote India Secure</h1>
              <p style="color: #94a3b8; font-size: 13px; margin: 0;">SEBI LODR Reg 44 & Section 108 Compliant E-Voting</p>
            </div>

            <div style="background: linear-gradient(135deg, #0d1b2a 0%, #0b1523 100%); border: 1px solid rgba(255, 255, 255, 0.15); border-radius: 20px; padding: 36px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);">
              <h2 style="color: #ffffff; font-size: 20px; margin: 0 0 12px; font-weight: 700;">Hello ${shareholderName},</h2>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0 0 24px;">
                You have been registered on the electronic voting roster for <strong style="color: #38bdf8;">${companyName}</strong>. Please use your confidential one-time voting token below to cast your ballot during the remote e-voting window:
              </p>

              <div style="background: rgba(2, 132, 199, 0.1); border: 1px solid rgba(2, 132, 199, 0.3); border-radius: 14px; padding: 24px; margin-bottom: 24px;">
                <h3 style="color: #38bdf8; font-size: 13px; font-weight: 700; margin: 0 0 16px; text-transform: uppercase; letter-spacing: 1px;">Confidential Voting Credentials</h3>

                <div style="margin-bottom: 16px;">
                  <p style="color: #94a3b8; font-size: 11px; margin: 0 0 4px; font-weight: 600; text-transform: uppercase;">Voting User ID</p>
                  <div style="background: #020817; border: 1px solid #334155; border-radius: 8px; padding: 12px 16px;">
                    <code style="color: #38bdf8; font-size: 18px; font-weight: 700; font-family: 'Courier New', monospace;">${loginId}</code>
                  </div>
                </div>

                <div>
                  <p style="color: #94a3b8; font-size: 11px; margin: 0 0 4px; font-weight: 600; text-transform: uppercase;">Security PIN / Password</p>
                  <div style="background: #020817; border: 1px solid #334155; border-radius: 8px; padding: 12px 16px;">
                    <code style="color: #38bdf8; font-size: 18px; font-weight: 700; font-family: 'Courier New', monospace;">${password}</code>
                  </div>
                </div>
              </div>

              <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 10px; padding: 14px; margin-bottom: 24px;">
                <p style="color: #fbbf24; font-size: 12px; font-weight: 600; margin: 0 0 4px;">⚠️ STATUTORY BALLOT SECRECY (Rule 20)</p>
                <p style="color: #cbd5e1; font-size: 12px; margin: 0; line-height: 1.5;">
                  Your voting decision is encrypted with AES-256 and decoupled from your identity. Under MCA Rule 20, once cast, a vote cannot be altered or cast again at the physical venue.
                </p>
              </div>

              <div style="text-align: center; margin-top: 24px;">
                <a href="https://www.shareholdervoting.in/shareholder-login" style="background: linear-gradient(135deg, #1e3a8a 0%, #0284c7 100%); color: white; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 700; font-size: 15px; display: inline-block; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.4);">
                  Access Shareholder Portal →
                </a>
              </div>
            </div>

            <div style="text-align: center; margin-top: 28px;">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                © 2026 Vote India Secure · Enterprise Corporate E-Voting SaaS<br>
                Automated statutory dispatch · Please do not reply directly to this email
              </p>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Try sending with primary domain, fallback to onboarding@resend.dev if domain not yet verified
    const sendPayload = {
      from: "Vote India Secure <notifications@shareholdervoting.in>",
      reply_to: "support@shareholdervoting.in",
      to: [targetEmail],
      subject: subject,
      text: text,
      html: html,
    };

    let res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify(sendPayload),
    });

    if (!res.ok) {
      const errorJson = await res.clone().json().catch(() => null);
      console.warn("Primary sender failed, testing fallback sender:", errorJson);

      // If domain verification is pending in Resend, retry with onboarding@resend.dev
      if (
        errorJson?.message?.toLowerCase().includes("domain") ||
        errorJson?.name === "validation_error" ||
        res.status === 403
      ) {
        res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            ...sendPayload,
            from: "Vote India Secure <onboarding@resend.dev>",
          }),
        });
      }
    }

    const data = await res.json();
    console.log("Email API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to deliver email via Resend");
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: unknown) {
    console.error("Error in send-shareholder-credentials function:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);