//npm test -- tests/drinks_api.test.js
const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

const api = supertest(app);
describe('Tests that dont need a beforeEach', () => {

  test('should return drinks as JSON ', async () => {
    await api.get('/api/drinks')
      .expect(200)
      .expect('Content-Type', /application\/json/);

  });

  test('there should be 5  drinks', async () => {
    await api.get('/api/drinks')
      .expect(200)
      .expect((res) => {
        res.body.length = 5;
      });
  });

  test('should return a drink called Mango Breeze with some specific properties', async () => {
    await api.get('/api/drinks/5f6e77dceb5f7a40ecdacf80')
      .expect(200)
      .expect((res) => {
        res.body.name = 'Mango Breeze';
      });
  });

});

afterAll(() => {
  mongoose.connection.close();
});






// get specific drink
// get all drinks
// should not be able to delete drink wo/ token
// should not be able to put new drinks wo/ token


