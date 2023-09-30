const { ctrlWrapper } = require('../../helpers');

const registration = require('./registration');
const login = require('./login');

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
};
