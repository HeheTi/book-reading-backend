const jwt = require('jsonwebtoken');
const { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH } = process.env;

const createTokens = id => {
  const payload = { id };

  const accessToken = jwt.sign(payload, SECRET_KEY_ACCESS, {
    expiresIn: '10m',
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY_REFRESH, {
    expiresIn: '7d',
  });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
