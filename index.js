const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { currentLocalDateTime } = require('./utility/helperFunctions');
const cors = require('cors');
const Drink = require('./database_models/drink');
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
//app.use(requestLogger);//this line must come after app.use(express.json()); because requestLogger needs json to work.



app.get('/api/drinks', (request, response) => {
  console.time('fetch drinks');
  Drink.find({}).then(drinks => {
    //console.trace();
    console.log('size of drinks is', drinks.length);
    response.json(drinks);
    console.timeEnd('fetch drinks');
  });
});

app.post('/api/drinks', (request, response) => {
  const body = request.body;
  /*TODO: when users are able to add their own drinks, some of the drink params
  will be hard for them to add so make the front end so that they can do so
  easily. e.g a dropdown for method since they may not know what it is*/

  if(!body.name |!body.ingredients |!body.glass |!body.imageUrl |!body.steps |!body.credits) {
    console.error('the new drink object is missing some values', body);
    return response.status(400).json({
      error: 'the new drink object is missing some values'
    });
  }
  //TODO the data sent from the frontend should match this on structure
  const drink = new Drink({
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
  });
  drink.save().then(savedDrink => {
    console.log('drink jas just been saved as-- ', savedDrink);
    response.json(savedDrink);
  });
});

app.get('/api/drinks/:id', (request, response) => {
  //TODO: make a good landing page for when the drinkk cant be found. maybe spinner and and after 3 seconds a redirect to 404 page
  Drink.findById(request.params.id)
    .then(drink => {
      if (drink) {
        console.log(drink.name, 'has been fetched from db');
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