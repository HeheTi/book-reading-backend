const bcrypt = require('bcrypt');
const { HttpError, createTokens } = require('../../helpers');
const { User } = require('../../models/user');

const login = async (req, res) => {
  const { email, password } = req.body;

  // for swagger
  if (email === 'superuser@mail.com') {
    const superuser = await User.findOne({ email });
    res.json({
      accessToken: 'superuser',
      refreshToken: 'superuser',
      user: {
        name: superuser.name,
        email: superuser.email,
      },
    });
    return;
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, 'Email or password invalid');
  }

  const tokens = createTokens(user._id);
  await User.findByIdAndUpdate(user._id, tokens);

  res.json({
    ...tokens,
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

module.exports = login;
