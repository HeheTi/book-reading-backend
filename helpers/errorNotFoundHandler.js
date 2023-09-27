const errorNotFoundHandler = (_, res) => {
  res.status(404).json({ message: 'Not found' });
};

module.exports = errorNotFoundHandler;
