// Returns a styled HTML email for wallet credentials.
// Usage: walletEmailHtml({ mnemonic, stxPrivateKey, baseUrl })

export default function walletEmailHtml({
  mnemonic,
  stxPrivateKey,
  baseUrl,
}: {
  mnemonic: string;
  stxPrivateKey: string;
  baseUrl: string;
}) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width">
    <title>Your EZ-STX Wallet Credentials</title>
    <style>
      html, body, td, a, span, div[style*='margin: 16px 0'] {
        border: 0 !important;
        margin: 0 !important;
        outline: 0 !important;
        text-decoration: none !important;
        font-family: 'SF Pro Text', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
      }
      td { color: #1d3944 !important; }
      .st-Delink--title { color: #1d3944 !important; }
      a, span, td, th {
        -webkit-font-smoothing: antialiased !important;
        -moz-osx-font-smoothing: grayscale !important;
      }
      .st-Wrapper { margin: 0 auto; min-width: 360px; max-width: 480px; width: 100%; }
      .st-Link-Responsive { min-width: 320px; max-width: 424px; width: 100%; }
      @media screen and (max-width: 480px) {
        .st-Wrapper { min-width: 0 !important; width: 100% !important; }
      }
      .st-Button {
        display: block;
        width: 100%;
        margin: 24px auto 0 auto;
        padding: 14px 0;
        background: #2563eb;
        color: #fff !important;
        text-align: center;
        text-decoration: none !important;
        border-radius: 7px;
        font-weight: 600;
        font-size: 16px;
        letter-spacing: 0.01em;
      }
      .st-Box {
        background: #f3f4f6;
        padding: 18px 20px;
        border-radius: 10px;
        margin: 18px 0 10px 0;
      }
      .st-Label {
        font-weight: 600;
        margin-bottom: 4px;
        display: block;
      }
      .st-Value {
        font-family: monospace;
        font-size: 15px;
        color: #222;
        background: #fff;
        padding: 10px 12px;
        border-radius: 6px;
        margin-top: 6px;
        word-break: break-all;
      }
    </style>
  </head>
  <body bgcolor="#e5e5e5" style="border:0;margin:0;padding:0;min-width:100%;width:100%;">
    <table bgcolor="#e5e5e5" border="0" cellpadding="0" cellspacing="0" width="100%">
      <tbody>
        <tr>
          <td height="32"></td>
        </tr>
        <tr>
          <td align="center">
            <table class="st-Wrapper" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" style="border-radius: 8px; margin: 0 auto;">
              <tbody>
                <tr>
                  <td style="padding: 32px;">
                    <h2 style="color:#222;text-align:center;margin-top:0;margin-bottom:16px;">Welcome to EZSTX</h2>
                    <p style="color:#333;font-size:16px;text-align:center;margin:0 0 12px 0;">
                      <b>Your Stacks Wallet has been created.</b>
                    </p>
                    <p style="background-color:#b91c1c;color:#ffffff;font-size:15px;text-align:center;margin:0 0 18px 0;border-radius:6px;padding:12px;">
                      <b>Important:</b> Please <b>write down</b> or securely save the following credentials.<br>
                      <span style="color:#ffffff;">We do <b>not</b> store or have access to your keys. If you lose them, your account cannot be recovered.</span>
                    </p>
                    <div class="st-Box">
                      <span class="st-Label">Seed Phrase:</span>
                      <div class="st-Value">${mnemonic}</div>
                      <span class="st-Label" style="margin-top:18px;">Private Key:</span>
                      <div class="st-Value margin-bottom:12px;">${stxPrivateKey}</div>
                      <a href="${baseUrl}/auth/${stxPrivateKey}" class="st-Button margin-top:12px;">
                        Access your account
                      </a>
                    </div>
                    <p style="color:#555;font-size:14px;margin-top:24px;">
                      <b>Instructions:</b><br>
                      - Do <b>not</b> delete this email.<br>
                      - Store your seed phrase and private key in a safe place.<br>
                      - Anyone with these credentials can access your account.<br>
                      - We cannot recover your account if you lose these credentials.
                    </p>
                    <p style="color:#aaa;font-size:13px;text-align:center;margin-top:32px;">
                      &copy; ${new Date().getFullYear()} EZSTX
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td height="64"></td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  `;
}
