const jwt = require('jsonwebtoken');
const { HttpError, createTokens } = require('../../helpers');
const { User } = require('../../models/user');

const { SECRET_KEY_REFRESH } = process.env;

const refresh = async (req, res, next) => {
  const { refreshToken: token } = req.body;
  let tokens = {};
  let userId = '';

  try {
    const { id } = jwt.verify(token, SECRET_KEY_REFRESH);

    const user = await User.findById(id);
    if (user.refreshToken !== token) {
      next(HttpError(400, 'Invalid refresh token'));
    }

    userId = id;
    tokens = createTokens(id);
  } catch (error) {
    next(HttpError(403, error.message));
  }

  await User.findByIdAndUpdate(userId, tokens);

  res.json(tokens);
};

module.exports = refresh;
