const exchangeSlugForUser = async (req, _, next) => {
  const {
    params: { usernameSlug },
    models,
  } = req;
  const username = usernameSlug.replace("@", ""); 

  req.pathUser = await models.User.findOne({ username });
  next();
};

const userNotFoundRedirect = (req, res, next) => {
  if (!req.pathUser) return res.status(404).send("User not found");
  next(); 
};

module.exports = {
  exchangeSlugForUser,
  userNotFoundRedirect,
};
