// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
};

module.exports = errorHandler;
