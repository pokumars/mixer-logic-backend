// user endpoints
const registrationRouter = require('express').Router();
const logger = require('../utility/logger');
const config = require('../utility/config');
const User = require('../database_models/user');
const bcrypt = require('bcrypt');
const messages = require('../utility/messages');


//register
registrationRouter.post('/', async (request, response, next ) => {
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
      favourites: [],
      myApprovedDrinkRecipes: [],
      myPendingDrinkRecipes: []
    };

    const user = new User(userObj);
    //console.log('---------- user ----------',user);

    const savedUser = await user.save();
    //console.log('---------- savedUser ----------',savedUser);

    response.status(201).send(savedUser);

  } catch (error) {
    next(error);
  }
});

//check if email isnt taken already
registrationRouter.get('/check-email-unique/:email', async(request, response, next) => {
  try {
    const emailParam = request.params.email;
    const result = await User.find({ email: emailParam });

    console.log(result);
    if (result.length === 0) {//no user has that username
      return response.status(200).json({ message: messages.email_unique_response });
    } else {
      return response.status(400).json({ message: messages.email_not_unique_response });
    }
  } catch (error) {
    next(error);
  }
});

//check if username is available
registrationRouter.get('/check-username-unique/:username', async(request, response, next) => {
  try {
    const usernameParam = request.params.username;
    const result = await User.find({ username: usernameParam });

    if (result.length === 0) {//no user has that username
      return response.status(200).json({ message: messages.username_unique_response });
    } else {
      return response.status(400).json({ message: messages.username_not_unique_response });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = registrationRouter;