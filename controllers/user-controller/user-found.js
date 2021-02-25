const exchangeSlugForUser = async (req, res, next) => {
  const {
    params: { userNameData },
    models,
  } = req;
  const username = userNameData.replace("@", "");
  req.foundUser = await models.User.findOne({ username });
  next();
};

const userNotFoundRedirect = (req, res, next) => {
  if (!req.foundUser) return res.status(404).send("User not found");
  next();
};

module.exports = {
  exchangeSlugForUser,
  userNotFoundRedirect,
};
