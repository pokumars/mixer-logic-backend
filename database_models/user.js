const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim:true, minlength: 6, unique: true, uniqueCaseInsensitive: true },
  email: { type: String, required: true, trim:true, minlength: 6, unique: true, uniqueCaseInsensitive: true },
  passwordHash: { type: String, required: true },
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drink' }],
  myApprovedDrinkRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drink' }],
  myPendingDrinkRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drink' }]
});

// when updating check this out https://www.npmjs.com/package/mongoose-unique-validator#find--updates
userSchema.plugin(uniqueValidator,  { type: 'mongoose-unique-validator' });

userSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.passwordHash;
    delete returnedObject._id;
  },
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);