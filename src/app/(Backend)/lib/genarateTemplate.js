export const getInvitationEmailTemplate = (inviteLink, role) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">

      <!-- Header -->
      <div style="background: #002B36; padding: 32px 40px 28px; text-align: center;">
        <div style="display: inline-flex; align-items: center; gap: 10px;">
          <div style="width: 36px; height: 36px; background: #C6EB71; border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #002B36;">zs</div>
          <span style="font-size: 22px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px;">ZapShift</span>
        </div>
      </div>

      <!-- Accent bar -->
      <div style="height: 4px; background: #C6EB71;"></div>

      <!-- Body -->
      <div style="padding: 40px 40px 32px;">
        <p style="font-size: 13px; color: #94a3b8; margin: 0 0 6px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;">You're invited</p>
        <h1 style="font-size: 26px; color: #002B36; margin: 0 0 24px; line-height: 1.25; font-weight: 700;">
          Join ZapShift as a<br>
          <em style="color: #0f6e56; font-style: italic;">${role.toUpperCase()}</em>
        </h1>

        <div style="width: 40px; height: 2px; background: #C6EB71; margin: 0 0 24px;"></div>

        <p style="font-size: 15px; color: #334155; line-height: 1.75; margin: 0 0 12px;">Hello,</p>
        <p style="font-size: 15px; color: #334155; line-height: 1.75; margin: 0 0 32px;">
          You've been invited to join the <strong style="color: #002B36;">ZapShift</strong> logistics platform.
          Click below to complete your registration and set your password.
        </p>

        <!-- CTA Button -->
        <div style="text-align: center; margin: 0 0 36px;">
          <a href="${inviteLink}" style="display: inline-block; background: #C6EB71; color: #002B36; padding: 15px 36px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; letter-spacing: 0.02em;">
            Accept Invitation →
          </a>
        </div>

        <!-- Info box -->
        <div style="background: #f8fafc; border-left: 3px solid #C6EB71; border-radius: 0 8px 8px 0; padding: 14px 18px; margin: 0 0 8px;">
          <p style="font-size: 13px; color: #64748b; margin: 0; line-height: 1.6;">
            <strong style="color: #002B36;">Link expires in 24 hours.</strong><br>
            If you did not expect this invitation, you can safely ignore this email.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 24px 40px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td>
              <div style="display: inline-flex; align-items: center; gap: 8px;">
                <div style="width: 24px; height: 24px; background: #C6EB71; border-radius: 5px; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: #002B36;">zs</div>
                <span style="font-size: 13px; font-weight: 600; color: #002B36;">ZapShift</span>
              </div>
            </td>
            <td style="text-align: right; font-size: 11px; color: #94a3b8;">
              © 2026 ZapShift Logistics. All rights reserved.
            </td>
          </tr>
        </table>
      </div>

    </div>
  `;
};