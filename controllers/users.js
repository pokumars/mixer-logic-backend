// user endpoints
const usersRouter = require('express').Router();
const logger = require('../utility/logger');
const bcrypt = require('bcrypt');
const config = require('../utility/config');
const User = require('../database_models/user');
const verifyToken = require('../utility/helperFunctions').verifyToken;


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

// like a drink
usersRouter.put('/like-drink/:id', async (request, response, next) => {
  try {
    const { decodedToken, user: userObj } = await verifyToken(request, next);
    const drinkId = request.params.id;
    //logger.info('--------- drinkId ---------', drinkId);
    const oldFavourites = userObj.favourites;
    //logger.info('---------- oldFavourites --------', oldFavourites);

    if(oldFavourites.indexOf(drinkId) === -1){//check that it isnt already favourited
      //add that drink to the favourite drinks
      const updatedFavourites = oldFavourites.concat(drinkId);
      //logger.info('--------- updatedFavourites ---------------', updatedFavourites);
      //logger.info('--------- decocdedToken ------', decodedToken);

      //replace the old favourites with the updated one and save
      userObj.favourites = updatedFavourites;
      const updatedUser = await User.findByIdAndUpdate(decodedToken.id, userObj, { new: true });

      //logger.info('--------- updatedUser ---------------', updatedUser);
      return response.status(200).send({ updatedUser });
    }else{
      return response.status(200).send({ message: 'The drink has already been liked' });
    }
    //return response.status(200).send({ message: 'request received' });
  } catch (error) {
    next(error);
  }
});


// unlike a drink
usersRouter.put('/unlike-drink/:id', async (request, response, next) => {
  try {
    const { decodedToken, user: userObj } = await verifyToken(request, next);
    const drinkId = request.params.id;
    //logger.info('--------- drinkId ---------', drinkId);
    const oldFavourites = userObj.favourites;
    //logger.info('---------- oldFavourites --------', oldFavourites);

    if(oldFavourites.indexOf(drinkId) !== -1){//check that it isnt already favourited
      //remove drink from favourite drinks
      const updatedFavourites = oldFavourites.filter(d => {
        return d.toString() !== drinkId;
      });
      //logger.info('--------- updatedFavourites ---------------', updatedFavourites);
      //logger.info('--------- decocdedToken ------', decodedToken);

      //replace the old favourites with the updated one and save
      userObj.favourites = updatedFavourites;
      const updatedUser = await User.findByIdAndUpdate(decodedToken.id, userObj, { new: true });

      //logger.info('--------- updatedUser ---------------', updatedUser);
      return response.status(200).send({ updatedUser });
    }else{
      return response.status(200).send({ message: 'The drink has already been liked' });
    }
    //return response.status(200).send({ message: 'request received' });
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;