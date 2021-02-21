const User = require('../database_models/user');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config= require('../utility/config');
const messages = require('../utility/messages');


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

loginRouter.post('/reset-password', async (request, response, next) => {
  console.log(request.body);
  console.log('/reset-password reached');

  //decode the token and get email out of it

  //find user by email

  //encrypt the new password with bcrypt

  //save it

  //return

  
  if (condition) {
    return response.status(200).send({ message:messages.password_change_successful });
  } else {
    return response.status(400);
  }
});

module.exports = loginRouter;