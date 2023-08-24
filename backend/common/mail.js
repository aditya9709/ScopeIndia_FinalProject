const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "burner791834@gmail.com",
    pass: "syndrome",
  },
});

function mailsender(to, subject, name) {
  var mailoptions = {
    from: "burner791834@gmail.com",
    to: to,
    subject: subject,
    html: `<!DOCTYPE html>
        <html>
        <head>
          <title>New User Registration</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            /* Add styles here */
            body {
              font-family: Arial, sans-serif;
              background-color: #f0bd9d;
              padding: 20px;
            }
            h1 {
              color: #db4340;
            }
            p {
              font-size: 16px;
              line-height: 1.5;
            }
            a {
              display: inline-block;
              padding: 10px 20px;
              background-color: #db4340;
              color: #fff;
              text-decoration: none;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
          <h1>Welcome ${name}to our website!</h1>
          <p>Thank you for registering with us. We are excited to have you on board.</p>
        </body>
        </html>`,
  };
  transporter.sendMail(mailoptions, (err, res) => {
    if (err) {
      return err.message;
    } else {
      return "sucess";
    }
  });
}

module.exports = mailsender;
