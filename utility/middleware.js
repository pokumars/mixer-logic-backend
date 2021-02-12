
const errorHandler =(error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  //if it  is not a CastError, pass on to the default exprs errorHandler
  next(error);
};



module.exports = {
  errorHandler
};