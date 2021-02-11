// user endpoints
const usersRouter = require('express').Router();
const logger = require('../utility/logger');

usersRouter.post('/', (request, response ) => {
  try {
    const body = request.body;

    if (!body.email || !body.username || !body.password) {
      logger.error('Either username, or email or password is missing');
      return response.status(400).json({
        error: 'Either username, or email or password is missing'
      });
    }
  } catch (error) {
    logger.error(error);
  }
});

module.exports = usersRouter;