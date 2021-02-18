//npm test -- tests/user_api.test.js

const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const testHelper = require('./testHelper');
const User = require('../database_models/user');


const api = supertest(app);


beforeAll(async() => {
  await User.deleteOne({ username: testHelper.testUser1.username });
  await User.deleteOne({ username: testHelper.testUser2.username });
});

test('return  a set of things in obj after signing up', async () => {
  const response = await api.post('/api/users')
    .send(testHelper.testUser2)
    .expect(201);

  expect(response.body.username).toBe(testHelper.testUser2.username);
});

test('should return token and user properties after login', async () => {
  const response = await api.post('/api/login').send({
    'username': testHelper.testUser2.username,
    'password': testHelper.testUser2.password
  }).expect(200);

  expect(response.body.token).toBeDefined();
  expect(response.body.user.id).toBeDefined();
  expect(response.body.user.username).toBe(testHelper.testUser2.username);
  expect(response.body.user.email).toBe(testHelper.testUser2.email);
});

test('should reject if username is too short ', async () => {
  //short username
  await api.post('/api/users')
    .send({
      username: 'de',
      email: 'asdkk@dguiugfgd.com',
      password: 'someL0ng3rP4a55w0rd'
    })
    .expect(400);

  //It shouldnt be in the db
  await User.find({ username: 'de' },(err, res) => {
    if(err) console.error(err);
    //console.log(res);
    expect(res).toHaveLength(0);
  });
  //console.log('-------- checkInDb -----', checkInDb);
});

test('should reject if password is too short ', async () => {
  //short username
  await api.post('/api/users')
    .send({
      username: 'rhododendron',
      email: 'assfdkk@dgudfdiugfgd.com',
      password: 'L0w'
    })
    .expect(400);

  //It shouldnt be in the db
  await User.find({ username: 'rhododendron' },(err, res) => {
    if(err) console.error(err);
    //console.log(res);
    expect(res).toHaveLength(0);
  });
});


afterAll(() => {
  mongoose.connection.close();
});

//register
//register with existing username or passowrd
// login
// add drink as favourite
// remove drink from favourite
// wrong username/non-existent username
// wrong password
// attempt an action - check that they are the real user
// extract token from request