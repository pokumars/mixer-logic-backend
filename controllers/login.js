const { request } = require('../app');
const User = require('../database_models/user');
const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');


loginRouter.post('/', (request, response) => {
  const body = request.body;

  // find user from db

  //compare passwordhash and decrypted password

  //send back token


});