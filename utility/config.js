require('dotenv').config();

let MONGODB_URI = '';

if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.MONGODB_URI;
}

if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_TRIAL_URI;
}

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TRIAL_URI;
}

const PORT = process.env.PORT;

const SALTROUNDS = 10;
const TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE;

module.exports= {
  MONGODB_URI,
  PORT,
  SALTROUNDS,
  TOKEN_SIGNATURE
};