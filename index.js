const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { currentLocalDateTime } = require('./utility/helperFunctions');
const cors = require('cors');
const drinksrouter = require('./controllers/drinks');
const drinksRouter = require('./controllers/drinks');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req,res) => JSON.stringify(req.body));
app.use(morgan((tokens, req, res) => {
  return[
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    currentLocalDateTime(),
  ].join(' ');
}));
app.use('/api/drinks', drinksRouter);
//app.use(requestLogger);//this line must come after app.use(express.json()); because requestLogger needs json to work.




__dirname = path.resolve(path.dirname(''));
app.get('/*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//middleware function that is only called if no route handles the HTTP request
const unknownEndpoint = (req, res) => {
  res.status(404).send({ 'error': 'unknown endpoint' });
};

app.use(unknownEndpoint);

const errorHandler =(error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }
  //if it  is not a CastError, pass on to the default exprs errorHandler
  next(error);
};


app.use(errorHandler);

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);