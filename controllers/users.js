// user endpoints
const usersRouter = require('express').Router();
const logger = require('../utility/logger');
const bcrypt = require('bcrypt');
const config = require('../utility/config');
const User = require('../database_models/user');

//register
usersRouter.post('/', async (request, response, next ) => {
  try {
    const body = request.body;

    if (!body.email || !body.username || !body.password|| body.password.length < 4) {
      logger.error('Either username, or email or password is missing. Or password length is too short');
      return response.status(400).json({
        error: `Either username, or email or password is missing.
         Also password length must be longer than 3 char`
      });
    }
    const passwordHash = await bcrypt.hash(body.password, config.SALTROUNDS);

    const userObj = {
      username: body.username,
      passwordHash: passwordHash,
      email: body.email,
      favourites: []
    };

    const user = new User(userObj);

    const savedUser = await user.save();

    response.status(201).send(savedUser);

  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;