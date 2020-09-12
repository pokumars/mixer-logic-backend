const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(express.json());

let drinks = [
  {
    name: 'Vodka Martini',
    dummyId: 1,
    ingredients: [
      ['vodka', 4, 'cl'],
      ['dry vermouth', 1, 'dash']
    ],
    imageUrl: 'vodkaMartini.jpg',
    glass: 'cocktail',
    method: ['stir'],
    garnish: ['olives', ' lemon twist'],
    categories: ['classic', 'martini', 'cocktail'],
    alcohols: ['vodka', 'dry vermouth'],
    page: 15,
    credits: [['Finlandia Vodka', 'image'], ['Finlandia Vodka', 'recipe']],
    steps: [
      'Chill both the martini and mixing glasses',
      'Pour the vodka, followed by the dry vermouth in an ice-filled mixing glass and stir.',
      'Strain into a chilled martini glass.',
      'Olive - or twist? Your choice.',
      'Cheers'
    ]

  },
  {
    name: 'Bloody Mary',
    dummyId: 2,
    ingredients: [
      ['vodka', 2, 'cl'],
      ['lime vodka', 2, 'cl'],
      ['lemon juice', 1, 'cl'],
      ['tomato juice', 8, 'cl'],
      ['salt & pepper'],
      ['tabasco/hot sauce ', 3, 'drops'],
      ['worcestershire sauce', 2, 'dashes']
    ],
    imageUrl: 'bloodyMaryCocktail.jpg',
    glass: 'On The Rocks',
    method: ['stir'],
    garnish: ['celery stalk', 'cucumber'],
    categories: ['classic', 'ordinary drink'],
    alcohols: ['vodka', 'lime vodka'],
    page: 16,
    credits: [['Finlandia Vodka', 'image'], ['Finlandia Vodka', 'recipe']],
    steps: [
      'Add the ingredients into the mixer',
      'Mix and chill together with ice',
      'Strain into a rocks glass',
      'Garnish with celery and cucumber'
    ]
  },
  {
    name: 'Spicy Mule',
    dummyId: 3,
    ingredients: [
      ['vodka', 4, 'cl'],
      ['ginger beer', 10, 'cl'],
      ['fresh lime juice', 2, 'cl'],
      ['fresh ginger', null, null],
      ['chili pepper', null, null]
    ],
    imageUrl: 'spicyMule.jpg',
    glass: 'highball',
    method: ['muddle', 'build'],
    garnish: ['cucumber stick', 'lime wedge'],
    categories: ['vodka', 'cocktail'],
    alcohols: ['vodka', 'ginger beer'],
    page: 24,
    credits: [['Finlandia Vodka', 'image'], ['Finlandia Vodka', 'recipe']],
    steps: [
      'Muddle the ginger in a glass with the sliced pepper.',
      'Add the ice, lime juice and ginger beer.',
      'Finally, add the vodka and a lime and fresh chili pepper to garnish'
    ]
  },
  {
    name: 'Mango Breeze',
    dummyId: 4,
    ingredients: [
      ['mango flavoured vodka', 4, 'cl'],
      ['cranberry juice', 6, 'cl'],
      ['grapefruit juice', 6, 'cl'],
      ['slice of mango', null, null]
    ],
    imageUrl: 'mangoBreeze.jpg',
    glass: 'highball',
    method: ['build'],
    garnish: ['slice of mango'],
    categories: ['cocktail'],
    alcohols: ['mango flavoured vodka'],
    page: 31,
    credits: [['Finlandia Vodka', 'image'], ['Finlandia Vodka', 'recipe']],
    steps: [
      'Fill a tall glass with ice and stir it round',
      'Add the vodka.',
      'Pour in the grapefruit and cranberry juice and garnish with a mango slice.'
    ]
  },
  {
    name: 'Mini Mary',
    dummyId: 5,
    ingredients: [
      ['vodka', 2, 'cl'],
      ['tomato juice', 2, 'cl'],
      ['hot chili sauce', 1, 'drop'],
      ['fresh lemon juice', 1, 'dash'],
      ['worcestershire sauce', 4, 'dash'],
      ['salt and pepper', null, null],
      ['celery', null, null]
    ],
    imageUrl: 'miniMary.jpg',
    glass: 'shot',
    method: ['shake'],
    garnish: ['cherry tomato', 'celery stalk'],
    categories: ['shot', 'short drinks'],
    alcohols: ['vodka'],
    page: 33,
    credits: [['Finlandia Vodka', 'image'], ['Finlandia Vodka', 'recipe']],
    steps: [
      'Put the salt, the juices and the sauces in an ice-filled shaker',
      'Introduce the vodka to the ingredients in the ice-filled shaker',
      'Shake and strain into a shot glass.',
      'Finish with black pepper and celery.'
    ]
  }
];

//This middleware logs each request. middleware takes 3 params: req, res and next
const requestLogger = (request, response, next) => {
  console.log('Method', request.method);
  console.log('Path', request.path);
  console.log('Body', request.body);
  console.log('--------------- END ---------------');
  next();
};
app.use(morgan('dev'));
/*morgan.token('body', (req,res) => JSON.stringify(req.body));
app.use(morgan((tokens, req, res) => {
  return[
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res)
  ].join(' ');
}));*/
//app.use(requestLogger);//this line m,ust come after app.use(express.json()); because requestLogger needs json to work.

app.get('/',(req, res) => {
  res.send('<h1>Hello World!</h1><br><p>What you are looking for might be in /api/drinks/</p>');
});

app.get('/api/drinks', (req, res) => {
  console.log('size of drinks is', drinks.length);
  res.json(drinks);
});

app.post('/api/drinks', (req, res) => {
  const body = req.body;
  /*TODO: when users are able to add their own drinks, some of the drink params
  will be hard for them to add so mmake the front end so that they can do so
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
  res.json(drink);
});

app.get('/api/drinks/:id', (req, res) => {
  const id = Number(req.params.id);
  console.log('request id -', id,);
  const drink = drinks.find(drink => drink.dummyId ===id);
  //console.log(drink);
  if(drink) {
    res.json(drink);
  }else {
    res.status(404).end();
  }
});

app.delete('/api/drinks/:id', (req, res)=> {
  console.log('a delete request');
  const id = Number(req.params.id);
  drinks = drinks.filter(drink => drink.id !== id);
  console.log('size of drinks is', drinks.length);
  res.status(204).end();
});

//middleware function that is only called if no route handles the HTTP request
const unknownEndpoint = (req, res) => {
  res.status(404).send({ 'error': 'unknown endpoint' });
};

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);