const { currentLocalDateTime } = require('../utility/helperFunctions');
const mongoose = require('mongoose');


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
  steps: [{ type:String, required: true }],
  author: { type:String, min: 3 },
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

