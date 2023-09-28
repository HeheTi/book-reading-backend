const { ctrlWrapper } = require('../../helpers');

const registrationUser = require('./registrationUser');

module.exports = { registrationUser: ctrlWrapper(registrationUser) };
