//npm test -- tests/user_api.test.js

const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const testHelper = require('./testHelper');
const User = require('../database_models/user');
//const Drink = require('../database_models/drink');
const messages = require('../utility/messages');


const api = supertest(app);

//login and get token
const loginTestUser1AndGetToken = async () => {
  const user = await api.post('/api/login')
    .send({ 'username': testHelper.testUser1.username , 'password': testHelper.testUser1.password })
    .expect(200);

  const token = user.body.token;
  //console.log('--------------------- token ----------------------', token);
  const userObj = user.body.user;
  return { userObj, token };
};

beforeAll(async () => {
  await User.deleteOne({ username: testHelper.testUser1.username });
  await User.deleteOne({ username: testHelper.testUser2.username });
});

describe('Registration tests', () => {
  test('should register successfully and return some properties', async () => {
    const response = await api.post('/api/register')
      .send(testHelper.testUser2)
      .expect(201);

    expect(response.body.username).toBe(testHelper.testUser2.username);
  });

  test('should give a 400 status when username is already in use', async () => {
    const response = await api.get('/api/register/check-username-unique/pokumars1')
      .expect(400);

    expect(response.body.message).toBe(messages.username_not_unique_response);
  });

  test('should give a 200 status when username is available', async () => {
    const response = await api.get('/api/register/check-username-unique/someRandomName')
      .expect(200);

    expect(response.body.message).toBe( messages.username_unique_response);
  });

  test('should give a 400 status when email is already in use', async () => {
    //TODO: make the email dynamic
    const response = await api.get('/api/register/check-email-unique/postman2@postman.fi')
      .expect(400);

    expect(response.body.message).toBe(messages.email_not_unique_response);
  });

  test('should give a 200 status when email is available', async () => {
    const response = await api.get('/api/register/check-email-unique/smth@smth.com')
      .expect(200);

    expect(response.body.message).toBe(messages.email_unique_response);
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
    await api.post('/api/register')
      .send({
        username: 'de',
        email: 'asdkk@dguiugfgd.com',
        password: 'someL0ng3rP4a55w0rd'
      })
      .expect(400);

    //It shouldnt be in the db
    await User.find({ username: 'de' }, (err, res) => {
      if (err) console.error(err);
      expect(res).toHaveLength(0);
    });
    //console.log('-------- checkInDb -----', checkInDb);
  });

  test('should reject if password is too short ', async () => {
    //short username
    await api.post('/api/register')
      .send({
        username: 'rhododendron',
        email: 'assfdkk@dgudfdiugfgd.com',
        password: 'L0w'
      })
      .expect(400);

    //It shouldnt be in the db
    await User.find({ username: 'rhododendron' }, (err, res) => {
      if (err) console.error(err);
      expect(res).toHaveLength(0);
    });
  });

  test('should reject registration if username exists ', async () => {
    //short username
    await api.post('/api/register')
      .send({
        username: 'rhododendron',
        email: 'assfdkk@dgudfdiugfgd.com',
        password: 'L0w'
      })
      .expect(400);

    //It shouldnt be in the db
    await User.find({ username: 'rhododendron' }, (err, res) => {
      if (err) console.error(err);
      expect(res).toHaveLength(0);
    });
  });

  test('should reject registration if username exists', async () => {
    //The emailshould also be unique so put a different email that isnt testUser2 email so it doesnt fail based on an email that already exists.
    const testEmailAddress = 'johnnycash@jonjoshelvey.com';
    await api.post('/api/register')
      .send({
        username: testHelper.testUser2.username,
        email: testEmailAddress,
        password: testHelper.testUser2.password,
      })
      .expect(400);

    //It shouldnt be in the db
    await User.find({ email: testEmailAddress }, (err, res) => {
      if (err) console.error(err);
      //console.log('--------res -------', res);
      expect(res).toHaveLength(0);
    });
  });

  test('should reject registration if email exists', async () => {
    //The username should also be unique so put a different username that isnt testUser2 username so it doesnt fail based on an username that already exists.
    const testUsername = 'jonjoShelvey125';
    await api.post('/api/register')
      .send({
        username: testUsername,
        email: testHelper.testUser2.email,
        password: testHelper.testUser2.password,
      })
      .expect(400);

    //It shouldnt be in the db
    await User.find({ username: 'testUsername' }, (err, res) => {
      if (err) console.error(err);
      //console.log('--------res -------', res);
      expect(res).toHaveLength(0);
    });
  });

});


describe('Login related tests', () => {
  test('should register successfully and return some properties', async () => {
    const response = await api.post('/api/register')
      .send(testHelper.testUser1)
      .expect(201);

    expect(response.body.username).toBe(testHelper.testUser1.username);
  });

  test('should return token and user properties after login', async () => {
    const response = await api.post('/api/login').send({
      'username': testHelper.testUser1.username,
      'password': testHelper.testUser1.password
    }).expect(200);

    expect(response.body.token).toBeDefined();
    expect(response.body.user.id).toBeDefined();
    expect(response.body.user.username).toBe(testHelper.testUser1.username);
    expect(response.body.user.email).toBe(testHelper.testUser1.email);
  });

  test('like a drink', async () => {
    const loginReturnObj = await loginTestUser1AndGetToken();
    //console.log('-------loginReturnObj.token------------',loginReturnObj.token);

    const drinkId = '602d5a0669ef0e46dc7c9b88';
    const response = await api.put(`/api/users/like-drink/${drinkId}`)
      .set('Authorization', `bearer ${loginReturnObj.token}`)
      .expect(200);

    expect(response.body.updatedUser.favourites).toBeDefined();
    expect(response.body.updatedUser.favourites).toEqual(expect.arrayContaining([drinkId]));
  });

  test('unlike a drink', async () => {
    const loginReturnObj = await loginTestUser1AndGetToken();
    //console.log('-------loginReturnObj.token------------',loginReturnObj.token);

    const drinkId = '602d5a0669ef0e46dc7c9b88';
    const response = await api.put(`/api/users/unlike-drink/${drinkId}`)
      .set('Authorization', `bearer ${loginReturnObj.token}`)
      .expect(200);

    expect(response.body.updatedUser.favourites).toBeDefined();
    expect(response.body.updatedUser.favourites).not.toEqual(expect.arrayContaining([drinkId]));
  });

  test('should return 401 and message when wrong password is given', async () => {
    const response = await api.post('/api/login').send({
      'username': testHelper.testUser1.username,
      'password': 'asdfghdas'
    }).expect(401);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe(messages.password_and_username_mismatch);
  });

  test('should return 401 and message when wrong username is given', async () => {
    const response = await api.post('/api/login').send({
      'username': 'someWorngusername',
      'password': testHelper.testUser1.password
    }).expect(401);

    expect(response.body.message).toBeDefined();
    expect(response.body.message).toBe(messages.no_such_user);
  });


});



afterAll(() => {
  mongoose.connection.close();
});

// Done - register
// Done - register with existing username or passowrd
// Done - login
// Done - add drink as favourite
// Done - remove drink from favourite
// Done - wrong username/non-existent username
// Done - wrong password
// Done indirectly- attempt an action - check that they are the real user
// Done indirectly- extract token from request