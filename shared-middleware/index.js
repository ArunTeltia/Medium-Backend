const requireAuthedUser = (req, res, next) => {
  next();
};

module.exports = {
  requireAuthedUser,
};
