const { ctrlWrapper } = require('../../helpers');

const registration = require('./registration');
const login = require('./login');
const refresh = require('./refresh');
const logout = require('./logout');

module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
  refresh: ctrlWrapper(refresh),
  logout: ctrlWrapper(logout),
};
