const nodemailer = require('nodemailer');
const emailTemplates = require('./emailTemplates');
const config = require('../config');
const fromNoReplyAddress = `"🍸No Reply mixer-logic🍸" <${config.EMAIL}>`;
const fromAddress = `"🍸mixer-logic🍸" <${config.EMAIL}>`;

let transporter = nodemailer.createTransport({
  host: 'smtp-mail.outlook.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.EMAIL,
    pass: config.EMAIL_PASSWORD,
  },
});

/**
 *
 * @param {*} recipientAddress Recipient of the email; gotten from the db
 * @param {*} username username of the email recipient; gotten from the db
 * @param {*} passwordResetLink 
 */
const sendPasswordResetEmail= async (recipientAddress, username, passwordResetLink) => {
  try {
    // create reusable transporter object using the default SMTP transport

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: fromNoReplyAddress, // sender address
      to: `${recipientAddress}`, // list of receivers
      subject: 'Password Reset - Mixer logic', // Subject line
      html: emailTemplates.passwordResetEmail(username, passwordResetLink)
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error(error);
  }
};

/**
 * 
 * @param {*} recipientAddress Recipient of the email; gotten from the db
 * @param {*} username username of the email recipient; gotten from the db
 */
const sendWelcomeEmail= async ( recipientAddress, username) => {
  try {
    // create reusable transporter object using the default SMTP transport

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: fromAddress, // sender address
      to: `${recipientAddress}`, // list of receivers
      subject: 'Welcome to Mixer-Logic', // Subject line
      html: emailTemplates.newUserWelcomeEmail(username)
    });

    console.log('Message sent: %s', info.messageId);
  } catch (error) {
    console.error(error);
  }
};

module.exports= { sendWelcomeEmail, sendPasswordResetEmail };