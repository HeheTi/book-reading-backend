const { ctrlWrapper } = require('../../helpers');

const registration = require('./registration');
const login = require('./login');
const refresh = require('./refresh');

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
};
