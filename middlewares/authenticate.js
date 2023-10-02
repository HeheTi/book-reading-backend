const jwt = require('jsonwebtoken');
const { HttpError } = require('../helpers');
const { User } = require('../models/user');
const { SECRET_KEY_ACCESS } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }

  // for swagger
  if (token === 'superuser') {
    const superuser = await User.findOne({ email: 'superuser@mail.com' });
    req.user = superuser;
    next();
    return;
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY_ACCESS);
    const user = await User.findById(id);
    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

module.exports = authenticate;
