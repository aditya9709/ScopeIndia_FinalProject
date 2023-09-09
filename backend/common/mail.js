const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "burner791834@gmail.com",
    pass: "vsfqznpepbnanojn",
  },
});

function mailsender(to, subject, fullName, temporaryPassword) {
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
          <h1>Welcome ${fullName} to our website!</h1>
          <p>Thank you for registering with us. We are excited to have you on board.</p>
          <p>Your temporary password is: ${temporaryPassword}</p>
        </body>
        </html>`,
  };
  transporter.sendMail(mailoptions, (err, res) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent successfully:", res.response);
    }
  });
}

function contactmail(to, subject, fullName, message) {
  var mailoptions = {
    from: "burner791834@gmail.com",
    to: "aditya.menon7@gmail.com",
    subject: subject,
    html: `<!DOCTYPE html>
        <html>
        <head>
          <title>User Enquiry</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
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
              colcontentor: #fff;
              text-decoration: none;
              border-radius: 4px;
            }
          </style>
        </head>
        <body>
        <ul>
        <li>name: ${fullName}</li>
        <li>subject: ${subject}</li>
        <li>message: ${message}</li>
        <li>enquiry email<: ${to}</li>
        </ul>
        </body>
        </html>`,
  };
  transporter.sendMail(mailoptions, (err, res) => {
    if (err) {
      console.error("Error sending email:", err);
    } else {
      console.log("Email sent successfully:", res.response);
    }
  });
}

module.exports = { mailsender, contactmail };
