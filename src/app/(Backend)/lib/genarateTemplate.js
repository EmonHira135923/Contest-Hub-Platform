export const getInvitationEmailTemplate = (inviteLink, role) => {
  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  return `
    <div style="background:#f0f4f8; padding:40px 16px; font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:540px; margin:auto;">

        <div style="text-align:center; margin-bottom:20px;">
          <span style="font-size:11px; color:#94a3b8; letter-spacing:0.08em; text-transform:uppercase;">
            ContestHub Platform · Official Invitation
          </span>
        </div>

        <div style="background:#ffffff; border-radius:20px; overflow:hidden; border:1px solid #e2e8f0;">

          <div style="height:4px; background:#002B36;"></div>

          <div style="padding:36px 40px 32px; border-bottom:1px solid #f1f5f9;">
            <table style="width:100%; border-collapse:collapse; margin-bottom:28px;">
              <tr>
                <td>
                  <table style="border-collapse:collapse;">
                    <tr>
                      <td style="padding-right:10px;">
                        <div style="width:34px; height:34px; background:#002B36; border-radius:8px; text-align:center; line-height:34px;">
                          <span style="font-size:11px; font-weight:800; color:#C6EB71;">CH</span>
                        </div>
                      </td>
                      <td>
                        <p style="font-size:15px; font-weight:700; color:#002B36; margin:0;">ContestHub</p>
                        <p style="font-size:10px; color:#94a3b8; margin:0; text-transform:uppercase; letter-spacing:0.06em;">Platform</p>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="text-align:right;">
                  <div style="display:inline-block; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:20px; padding:5px 14px;">
                    <span style="font-size:11px; font-weight:700; color:#15803d; text-transform:uppercase; letter-spacing:0.06em;">${roleLabel}</span>
                  </div>
                </td>
              </tr>
            </table>

            <div style="margin-bottom:6px;">
              <span style="font-size:11px; font-weight:600; color:#C6EB71; background:#002B36; padding:3px 10px; border-radius:4px; letter-spacing:0.08em; text-transform:uppercase;">You're invited</span>
            </div>
            <h1 style="font-size:26px; font-weight:800; color:#0f172a; margin:10px 0 12px; line-height:1.2;">
              Join ContestHub as a<br>
              <span style="color:#0f6e56;">${roleLabel}</span>
            </h1>
            <p style="font-size:14px; color:#64748b; margin:0; line-height:1.75;">
              Hello — someone on the ContestHub team has personally invited you to the platform. We'd love to have you on board.
            </p>
          </div>

          <div style="padding:32px 40px;">

            <table style="width:100%; border-collapse:collapse; margin-bottom:28px;">
              <tr>
                <td style="width:50%; padding-right:24px; border-right:1px solid #f1f5f9;">
                  <p style="font-size:10px; font-weight:600; color:#94a3b8; margin:0 0 4px; text-transform:uppercase; letter-spacing:0.08em;">Your role</p>
                  <p style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">${roleLabel}</p>
                </td>
                <td style="padding-left:24px;">
                  <p style="font-size:10px; font-weight:600; color:#94a3b8; margin:0 0 4px; text-transform:uppercase; letter-spacing:0.08em;">Link valid for</p>
                  <p style="font-size:15px; font-weight:700; color:#0f172a; margin:0;">24 hours</p>
                </td>
              </tr>
            </table>

            <p style="font-size:14px; color:#475569; line-height:1.8; margin:0 0 28px;">
              Click the button below to accept your invitation and create your account. You'll be guided through a quick setup to choose your password and complete your profile.
            </p>

            <div style="text-align:center; margin-bottom:20px;">
              <a href="${inviteLink}" style="display:inline-block; background:#002B36; color:#C6EB71; padding:15px 48px; border-radius:12px; font-weight:700; font-size:15px; text-decoration:none; letter-spacing:0.03em;">
                Accept invitation &rarr;
              </a>
            </div>

            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px 16px; margin-bottom:24px;">
              <p style="font-size:12px; color:#64748b; margin:0;">
                Or copy this link: <a href="${inviteLink}" style="color:#0f6e56; word-break:break-all;">${inviteLink}</a>
              </p>
            </div>

            <div style="background:#fffbeb; border:1px solid #fde68a; border-radius:10px; padding:13px 16px;">
              <p style="font-size:12px; color:#92400e; margin:0; line-height:1.65;">
                <strong style="color:#78350f;">This link expires in 24 hours.</strong>
                If you weren't expecting this invitation, you can safely ignore this email — no account will be created.
              </p>
            </div>
          </div>

          <div style="background:#f8fafc; border-top:1px solid #f1f5f9; padding:24px 40px;">
            <p style="font-size:11px; font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.08em; margin:0 0 14px;">What happens next</p>
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td style="width:33%; text-align:center; padding:0 8px;">
                  <div style="width:32px; height:32px; background:#002B36; border-radius:8px; margin:0 auto 8px; line-height:32px; text-align:center;">
                    <span style="color:#C6EB71; font-size:14px;">01</span>
                  </div>
                  <p style="font-size:11px; font-weight:600; color:#334155; margin:0;">Create account</p>
                </td>
                <td style="width:33%; text-align:center; padding:0 8px;">
                  <div style="width:32px; height:32px; background:#002B36; border-radius:8px; margin:0 auto 8px; line-height:32px; text-align:center;">
                    <span style="color:#C6EB71; font-size:14px;">02</span>
                  </div>
                  <p style="font-size:11px; font-weight:600; color:#334155; margin:0;">Set password</p>
                </td>
                <td style="width:33%; text-align:center; padding:0 8px;">
                  <div style="width:32px; height:32px; background:#002B36; border-radius:8px; margin:0 auto 8px; line-height:32px; text-align:center;">
                    <span style="color:#C6EB71; font-size:14px;">03</span>
                  </div>
                  <p style="font-size:11px; font-weight:600; color:#334155; margin:0;">Start ${roleLabel === "Judge" ? "judging" : "exploring"}</p>
                </td>
              </tr>
            </table>
          </div>

          <div style="border-top:1px solid #f1f5f9; padding:18px 40px;">
            <table style="width:100%; border-collapse:collapse;">
              <tr>
                <td>
                  <table style="border-collapse:collapse;">
                    <tr>
                      <td style="padding-right:8px;">
                        <div style="width:22px; height:22px; background:#002B36; border-radius:5px; text-align:center; line-height:22px;">
                          <span style="font-size:8px; font-weight:800; color:#C6EB71;">CH</span>
                        </div>
                      </td>
                      <td>
                        <span style="font-size:12px; font-weight:600; color:#334155;">ContestHub</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="text-align:right; font-size:11px; color:#94a3b8;">© 2026 · All rights reserved</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="margin-top:20px; text-align:center;">
          <p style="font-size:11px; color:#94a3b8; margin:0 0 4px;">Sent by ContestHub Platform</p>
          <p style="font-size:11px; color:#cbd5e1; margin:0;">ContestHub Inc., 123 Platform Ave, Tech City</p>
        </div>
      </div>
    </div>
  `;
};
