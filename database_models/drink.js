require('dotenv').config()
const mongoose = require('mongoose');
const { currentLocalDateTime } = require('../utility/helperFunctions');

const url = process.env.MONGODB_URI;
console.log('connecting to', url);

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.trace();
    console.log('error connecting to MongoDB:', error.message);
    console.log(' The above error occurred at', currentLocalDateTime());
  });

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

module.exports = mongoose.model('Drink', drinkSchema);

