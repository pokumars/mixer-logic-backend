const nodemailer = require('nodemailer');
const config = require('../config');





// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async () => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.EMAIL,
      pass: config.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"🍸No Reply mixer-logic 🍸" <${config.EMAIL}>`, // sender address
    to: ' mira.pohjanrinne@hotmail.com, mira.pohjanrinne@gmail.com', // list of receivers
    subject: 'Testing Nodemailer', // Subject line
    html: emailOutput
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
};
console.log('--------process.env.EMAIL_PASS----------',config.EMAIL_PASSWORD);

sendEmail().catch(console.error);