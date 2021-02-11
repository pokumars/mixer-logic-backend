const drinksRouter = require('express').Router();
const Drink = require('../database_models/drink');
const logger = require('../utility/logger');

// get all drinks
drinksRouter.get('/', (request, response) => {
    console.time('fetch drinks');
    Drink.find({}).then(drinks => {
        //console.trace();
        logger.info('size of drinks is', drinks.length);
        response.json(drinks);
        console.timeEnd('fetch drinks');
    });
});

drinksRouter.post('/', (request, response) => {
    const body = request.body;
    /*TODO: when users are able to add their own drinks, some of the drink params
    will be hard for them to add so make the front end so that they can do so
    easily. e.g a dropdown for method since they may not know what it is*/

    if (!body.name | !body.ingredients | !body.glass | !body.imageUrl | !body.steps | !body.credits) {
        console.error('the new drink object is missing some values', body);
        return response.status(400).json({
            error: 'the new drink object is missing some values'
        });
    }
    //TODO the data sent from the frontend should match this on structure
    const drink = new Drink({
        'name': body.name,
        'imageUrl': body.imageUrl,
        'glass': body.glass,
        'method': body.method || [],
        'garnish': body.garnish || [],
        'categories': body.categories || [],
        'alcohols': body.alcohols || [],
        'page': body.page || null,
        'credits': body.credits,
        'ingredients': body.ingredients,
        'steps': body.steps
    });

    drink.save().then(savedDrink => {
        logger.info('drink has just been saved as-- ', savedDrink);
        response.json(savedDrink);
    }).catch(error => {
        console.error(error.message);
        logger.info(currentLocalDateTime());
    });
});

drinksRouter.get('/:id', (request, response, next) => {
    //TODO: make a good landing page for when the drinkk cant be found. maybe spinner and and after 3 seconds a redirect to 404 page
    Drink.findById(request.params.id)
        .then(drink => {
            if (drink) {
                logger.info(drink.name, 'has been fetched from db. Its id is--->', drink.id);
                response.json(drink);
            } else {
                response.status(404).end();
            }
        })
        .catch(error => {
            next(error);
        });
});

drinksRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id;
    logger.info('a delete request for ', id);

    Drink.findByIdAndRemove(id)
        .then(result => {
            response.status(204).end();
        })
        .catch(error => next(error));
});


module.exports= drinksRouter;