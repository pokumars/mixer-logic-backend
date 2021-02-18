const config = require('../utility/config');

const testUser1 = {
  username: 'testUser1',
  email: 'testUser1@testuser1.com',
  password: config.TEST_PASSWORD_1
};

const testUser2 = {
  username: 'testUser2',
  email: 'testUser2@testuser2.com',
  password: config.TEST_PASSWORD_1
};

module.exports = {
  testUser1,
  testUser2,
};