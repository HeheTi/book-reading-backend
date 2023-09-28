const bcrypt = require('bcrypt');
const { HttpError } = require('../../helpers');
const { User } = require('../../models/user');

const registrationUser = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, `${email} already use`);
  }

  if (password !== repeatPassword) {
    throw HttpError(400, `Repeat password must match the password field`);
  }

  const hashPass = await bcrypt.hash(password, 10);

  user = await User.create({ name, email, password: hashPass });

  res.json({ user: { name: user.name, email: user.email } });
};

module.exports = registrationUser;
