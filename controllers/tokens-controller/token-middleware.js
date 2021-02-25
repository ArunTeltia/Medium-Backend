const verifyPayload = (req, res, next) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ error: "username is missing" });
  if (!password) return res.status(400).json({ error: "password is missing" });

  next();
};

const authenticateRequest = async (req, res, next) => {
  const {
    body: { username, password },
    models,
  } = req;
  const user = await models.User.findOne({ username });
  const authenticated = user && (await user.verifyPassword(password));
  if (!authenticated) {
    return res.status(401).json({ error: "failed to authenticate" });
  }
  req.authedUser = user;
  next();
};

module.exports = {
  verifyPayload,
  authenticateRequest,
};
