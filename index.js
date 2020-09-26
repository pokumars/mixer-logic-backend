const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
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
    tokens['response-time'](req, res), 'ms', '---[',
    tokens.date('web'), ']---',
    tokens.body(req, res),
  ].join(' ');
}));
//app.use(requestLogger);//this line must come after app.use(express.json()); because requestLogger needs json to work.

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://ohe_boomin_want_some_more:${password}@drinkcluster0.trkxv.mongodb.net/mixer-logic-test?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

//TODO the data sent from the frontend should match this on structure
const drinkSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  glass: String,
  method: [String],
  garnish: [String],
  categories: [String],
  alcohols: [String],
  page: Number,
  credits:[[String]],
  ingredients: [[]],
  steps: [String]
});

drinkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //reassign the default._id to be id and to string. It is otherwise an object and that may be problematic when writing tests
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id; //remove._id
    delete returnedObject.__v; //remove __v whcch is the version number of the db
  }
});

const Drink = mongoose.model('Drink', drinkSchema);

/* Drink.find({}).then(res => {
  console.log('line 52', res);
  mongoose.connection.close();
}); */

app.get('/api/drinks', (request, response) => {
  console.time('fetch drinks');
  Drink.find({}).then(drinks => {
    //console.trace();
    console.log('size of drinks is', drinks.length);
    response.json(drinks);
    console.timeEnd('fetch drinks');
  });
});

app.post('/api/drinks', (req, res) => {
  const body = req.body;
  /*TODO: when users are able to add their own drinks, some of the drink params
  will be hard for them to add so make the front end so that they can do so
  easily. e.g a dropdown for method since they may not know what it is*/


  if(!body.name |!body.ingredients |!body.glass |!body.imageUrl |!body.steps) {
    console.error('the new drink object is missing some values');
    return res.status(400).json({
      error: 'the new drink object is missing some values'
    });
  }

  const drink =   { //TODO the data sent from the frontend should match this on structure
    'name': body.name,
    'imageUrl':body.imageUrl,
    'glass': body.glass,
    'method': body.method || [],
    'garnish':body.garnish || [],
    'categories': body.categories || [],
    'page': body.page || null,
    'credits':body.credits,
    'ingredients': body.ingredients,
    'steps': body.steps
  };

  //console.log(drink);
  //drinks = drinks.concat(drink);
  res.json(drink);
});

app.get('/api/drinks/:id', (request, response) => {
  //TODO: make a good landing page for when the drinkk cant be found. maybe spinner and and after 3 seconds a redirect to 404 page
  Drink.findById(request.params.id)
    .then(drink => {
      if (drink) {
        console.log(drink.name, 'has been fetched from db')
        response.json(drink);
      } else {
        response.status(404).end();
      }
    })
    .catch(error => {
      console.log(error);
      response.status(500).end();
    });
});

/*app.delete('/api/drinks/:id', (req, res)=> {
  console.log('a delete request');
  const id = Number(req.params.id);
  drinks = drinks.filter(drink => drink.id !== id);
  console.log('size of drinks is', drinks.length);
  res.status(204).end();
});*/

__dirname = path.resolve(path.dirname(''));
app.get('/*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//middleware function that is only called if no route handles the HTTP request
const unknownEndpoint = (req, res) => {
  res.status(404).send({ 'error': 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3003;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);