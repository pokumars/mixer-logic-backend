require('dotenv').config();

let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_TRIAL_URI;
}

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_TRIAL_URI;
}

const PORT = process.env.PORT;

const SALTROUNDS = 10;

const TEST_PASSWORD_1 = process.env.TEST_PASSWORD_1;
const TEST_PASSWORD_2 = process.env.TEST_PASSWORD_2;

const TOKEN_SIGNATURE = process.env.TOKEN_SIGNATURE;

const EMAIL_PASSWORD = process.env.EMAIL_PASS;
const EMAIL= process.env.EMAIL;

//TODO: for admin signups, use a differenet signature
module.exports= {
  MONGODB_URI,
  PORT,
  SALTROUNDS,
  TOKEN_SIGNATURE,
  TEST_PASSWORD_1,
  TEST_PASSWORD_2,
  EMAIL_PASSWORD,
  EMAIL
};