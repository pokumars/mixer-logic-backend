
/**
 * 
 * @param {*} username username of the recipient
 * @param {*} passwordResetLink link for the password reset
 */
const passwordResetEmail = (username, passwordResetLink) => {
  const passwordResetEmail = `<div class="email-body" style="color: #05386B; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
  <h2>Hi ${username}</h2>

  <p>
    You recently requested to reset the password of your mixer-logic credentials.
    Click on the link below to reset it.
  </p>
  <p>
    If you did not request a password reset, please ignore this email or reply to us
    to let us know. This password reset link is only valid for the next 20 minutes.
  </p>
  <p>
    Thank you, <br>
    Oheneba and the mixer-logic Team
  </p>
  <hr>
  <p class="smaller-text" style="color: gray; font-size: 8px;">
    If you are having trouble clicking the link, please
    copy and paste the URL below into the browser window.
  </p>
</div>`;

  return passwordResetEmail;
};
/**
 * 
 * @param {*} username username of the recipient
 */
const newUserWelcomeEmail = (username) => {
  const newUserWelcome = `<div class="email-body" style="color: #05386B; font-family: Arial, Helvetica, sans-serif; font-size: 12px;">
  <h2>Hey ${username},</h2>
  <p>I’m Oheneba, the mixer-logic creator, and I’d like to thank you for signing up for our service.</p>

  <p>I’d love to hear what you think of mixer-logic and if there is anything we can improve. If you have any
    questions, please reply to this email.
    I’m always happy to help! Please be patient for a response as this is a hobby project.
  </p>

  <p>
    Best regards,<br>
    Oheneba
  </p>

</div>`;

  return newUserWelcome
};

module.exports= { passwordResetEmail, newUserWelcomeEmail };