const { getAllPropertyNames } = require('./helperFunctions');
const  logger = require('./logger');

const errorHandler =(error, request, response, next) => {
  logger.error('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-* \n logged in errorHandler', error);
  //console.log('------------------------------',getAllPropertyNames(error));

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  //logger.error()
  if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message });
  }

  //if it  is not a CastError or ValidationError, pass on to the default exprs errorHandler
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization');

  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = authorization.substring(7);
  }
  next();
};



module.exports = {
  errorHandler,
  tokenExtractor
};