const verifyPayload = ({ body }, res, next) => {
  const { username, password, verifyPassword } = body;

  if (!username) return res.status(400).json({ error: "username missing" });
  if (!password) return res.status(400).json({ error: "password missing" });
  if (!verifyPassword)
    return res.status(400).json({ error: "verifyPassword missing" });
  if (password !== verifyPassword)
    return res.status(400).json({ error: "Passwords do not match" });

  next();
};

const checkDuplicate = async ({ body, models }, res, next) => {
  const existingUser = await models.User.countDocuments({
    username: body.username,
  });
  if (existingUser !== 0)
    return res.status(409).json({ error: "Username already registered" });

  next();
};

const registerUser = async ({ body, models }, res) => {
  const { username, password } = body;
  try {
    const newUser = await models.User.create({ username, password });
    return res.json({
      id: newUser._id.toHexString(),
      username: newUser.username,
      avatarURL: newUser.avatarURL,
      links: newUser.buildResourceLinks(),
    });
  } catch (validationError) {
    return res.status(400).json({ error: validationError.message });
  }
};

module.exports = {
  verifyPayload,
  checkDuplicate,
  registerUser,
};
