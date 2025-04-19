const nodemailer = require('nodemailer');
require('dotenv').config();



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});


const sendBirthdayEmail = async (email_address, name) => {
  try {
    await transporter.sendMail({
      from: `"Clinton" <${process.env.GMAIL_USER}>`,
      to: email_address,
      subject: '🎂 Happy Birthday!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Happy Birthday!</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Arial, sans-serif;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f0f7ff;">
            <tr>
              <td align="center" style="padding: 40px 0;">
                <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(100, 150, 255, 0.15);">
                  <!-- Header with gradient -->
                  <tr>
                    <td align="center" style="background: linear-gradient(135deg, #78b6ff 0%, #5a93d6 100%); padding: 40px 20px;">
                      <h1 style="color: #ffffff; font-size: 32px; margin: 0; text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                        Happy Birthday, ${name}! 🎉
                      </h1>
                    </td>
                  </tr>
                  
                  <!-- Cake Image -->
                  <tr>
                    <td align="center" style="padding: 30px 20px 0;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center">
                            <div style="position: relative; width: 150px; height: 150px; margin: 0 auto;">
                              <!-- Cake base -->
                              <div style="position: absolute; bottom: 0; left: 25px; width: 100px; height: 60px; background-color: #78b6ff; border-radius: 10px 10px 50% 50%;"></div>
                              <!-- Cake middle layer -->
                              <div style="position: absolute; bottom: 50px; left: 37.5px; width: 75px; height: 40px; background-color: #5a93d6; border-radius: 10px 10px 5px 5px;"></div>
                              <!-- Cake top layer -->
                              <div style="position: absolute; bottom: 85px; left: 50px; width: 50px; height: 30px; background-color: #4a95e3; border-radius: 10px 10px 5px 5px;"></div>
                              <!-- Candle -->
                              <div style="position: absolute; bottom: 115px; left: 70px; width: 10px; height: 25px; background: linear-gradient(180deg, #ff9d9d 0%, #ff5252 100%);"></div>
                              <!-- Flame -->
                              <div style="position: absolute; bottom: 140px; left: 70px; width: 10px; height: 15px; background: linear-gradient(180deg, #ffeb3b 0%, #ff9800 100%); border-radius: 50% 50% 20% 20%;"></div>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Main content -->
                  <tr>
                    <td style="padding: 30px 40px;">
                      <p style="color: #4a4a4a; font-size: 18px; line-height: 1.6; margin-bottom: 20px; text-align: center;">
                        Wishing you a wonderful day filled with joy, laughter, and beautiful moments! May this special day bring you everything you've been hoping for.
                      </p>
                      <p style="color: #4a4a4a; font-size: 18px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
                        We're so glad to have you as part of our community.
                      </p>
                    </td>
                  </tr>

                  <!-- Gift button -->
                  <tr>
                    <td align="center" style="padding: 0 40px 30px;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="background-color: #78b6ff; border-radius: 50px; padding: 12px 30px;">
                            <a href="#" style="color: white; text-decoration: none; font-weight: bold; font-size: 16px; display: inline-block;">Your Birthday Gift Awaits! 🎁</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer with decorative elements -->
                  <tr>
                    <td style="background-color: #f0f7ff; padding: 20px 40px; border-top: 1px solid #e1edfd;">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" style="padding-bottom: 15px;">
                            <div style="display: inline-block; margin: 0 5px; width: 10px; height: 10px; background-color: #78b6ff; border-radius: 50%;"></div>
                            <div style="display: inline-block; margin: 0 5px; width: 10px; height: 10px; background-color: #5a93d6; border-radius: 50%;"></div>
                            <div style="display: inline-block; margin: 0 5px; width: 10px; height: 10px; background-color: #4a95e3; border-radius: 50%;"></div>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <p style="color: #999; font-size: 14px; margin: 0;">
                              With love, from clinton
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `
    });
    console.log(`Birthday email sent to ${email_address}`);
  } catch (error) {
    console.error(`Email send failed: ${error.message}`);
  }
}
module.exports = { sendBirthdayEmail };