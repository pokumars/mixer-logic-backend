const User = require('../database_models/user');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config= require('../utility/config');
const messages = require('../utility/messages');
const logger = require('../utility/logger');
const emailSender = require('../utility/emails/emailSender');


loginRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    // find user from db
    const user = await User.findOne({ username: body.username });
    if (!user) {//user does not exist
      return response.status(401).send({ message: 'Access denied! There is no such user in our system' });
    }

    //compare passwordhash and decrypted password
    const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash);

    //password is wrong
    if (!passwordCorrect) {
      return response.status(401).send({ message: 'The password and username does not match' });
    }

    //create token
    const objToSign = {
      username: user.username,
      id: user.id
    };
    const token = jwt.sign(objToSign, config.TOKEN_SIGNATURE);

    //send back token
    return response.status(200).send({ token, user: user.toJSON() });

  } catch (error) {
    next(error);
  }

});

loginRouter.post('/forgot-password', async (request, response, next) => {
  const body = request.body;
  try {
    logger.info(request.body);
    logger.info('/forgot-password reached');

    //find user by email
    const user = await User.findOne({ email: body.email });

    if (!user) {// user does not exist
      logger.info('--------in /forgot-password ----------', messages.password_reset_to_wrong_email);
      return response.status(404).end();
    }

    // create reset url - expires in 20 minutes
    const resetUrl = jwt.sign({ userId: user._id },user.passwordHash,{ expiresIn: 20 * 60 });

    // send email
    //TODO: wehenever the host changes this url must change too
    const result = await emailSender.sendPasswordResetEmail(user.email, user.username, `http://localhost:3003/reset-password/${resetUrl}/${user.email}`);

    if (result.messageId) {
      return response.status(204).end();
    }else{
      logger.error('there was an issue while sending the email');
      return response.status(500).send({ message: 'there was an issue while sending the email' });
    }
  } catch (error) {
    next(error);
  }

});

//Not implemented TODO:
loginRouter.post('/reset-password/:passwordResetLink/:email', async (request, response, next) => {
  logger.info(request.body);
  logger.info('/reset-password reached');

  //decode the token and get email out of it
  const passwordResetLink = request.params.passwordResetLink;
  const requestParamEmail = request.params.email;
  logger.info('-------request.params-------',request.params);

  //find user based on the url from the client side in order to tget their passwordHash for jwt secret
  const userInResetLink = await User.findOne({ email:requestParamEmail });
  console.log('userInResetLink', userInResetLink);

  const decodedToken = jwt.verify(passwordResetLink, userInResetLink.passwordHash);
  logger.info('-------decodedToken-------',decodedToken);

  //find the actual user that is in the decoded token
  const userInToken = await User.findById(decodedToken.userId);
  console.log('userInToken', userInToken);

  logger.info('-------userInToken._id === userInResetLink._id-------',userInToken._id.toString() === userInResetLink._id.toString());
  logger.info('-------userInToken.email === requestParamEmail-------',userInToken.email === requestParamEmail);
  //if the user in token is the same as the user in client request param - i.e they are the one who sent the reset request
  if (userInToken._id.toString() === userInResetLink._id.toString() && userInToken.email === requestParamEmail) {

    //compare the userInResetLink to user id gotten from decoded token
    return response.status(200).send({ message:messages.password_change_successful });
  } else {
    return response.status(400);
  }


  //find user by email

  //encrypt the new password with bcrypt

  //save it

  //return



});

module.exports = loginRouter;