const config = require('../utility/config')
const mongoose = require('mongoose');
const logger = require('../utility/logger');
const { currentLocalDateTime } = require('../utility/helperFunctions');

const url = config.MONGODB_URI
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

//TODO the data sent from the frontend should match this on structure
const drinkSchema = new mongoose.Schema({
  name: { type:String, min: 3, required: true },
  imageUrl: { type:String, min: 6, required: true },
  glass:  { type:String, min: 3, required: true },
  method: { type:[String], required: true },
  garnish: { type:[String], required: true },
  categories: { type:[String], required: true },
  alcohols: { type:[String], required: true },
  page: Number,
  credits:[[String]],
  ingredients: { type:[[]], required: true },
  steps: [{ type:String, required: true }]
});

drinkSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    //reassign the default._id to be id and to string. It is otherwise an object and that may be problematic when writing tests
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id; //remove._id
    delete returnedObject.__v; //remove __v which is the version number of the db
  }
});

module.exports = mongoose.model('Drink', drinkSchema);

