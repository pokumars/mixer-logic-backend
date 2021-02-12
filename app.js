const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./utility/middleware').errorHandler;
const path = require('path');
const cors = require('cors');
const drinksRouter = require('./controllers/drinks');
const usersRouter = require('./controllers/users');
const logger = require('./utility/logger');
const config = require('./utility/config');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('body', (req, res) => JSON.stringify(req.body));
//TODO: the time keeps logging same time
app.use(morgan((tokens, req, res) => {
  return[
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.body(req, res, 'content-length'),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['date'](req, res)
  ].join(' ');
}));

const url = config.MONGODB_URI;
logger.info('connecting to', url.substring(0,40), '.........');

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    logger.info('connected to MongoDB');
  })
  .catch(error => {
    console.trace();
    logger.error('error connecting to MongoDB:', error.message);
    logger.error(' The above error occurred at', currentLocalDateTime());
  });


app.use('/api/users', usersRouter);
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

app.use(errorHandler);


module.exports = app;