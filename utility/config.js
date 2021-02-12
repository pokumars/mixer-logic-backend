require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

const PORT = process.env.PORT;

const SALTROUNDS = 10;

module.exports= {
  MONGODB_URI,
  PORT,
  SALTROUNDS
};