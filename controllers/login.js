const User = require('../database_models/user');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config= require('../utility/config');


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

module.exports = loginRouter;