require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT_LENGTH } = process.env.SALT_LENGTH;

const createTokenPayload = async (authedUser, saltRounds) => {
  const { id, username, avatarURL } = authedUser;
  const hashedID = await bcrypt.hash(id, saltRounds);

  return { id: hashedID, username, avatarURL };
};

const createToken = async (authedUser) => {
  const { JWT_SECRET } = process.env;
  const payload = await createTokenPayload(authedUser, SALT_LENGTH);

  return jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 });
};

const createTokenHandler = async (req, res) => {
  const token = await createToken(req.authedUser);
  return res.json({ token });
};

module.exports = {
  createTokenPayload,
  createToken,
  createTokenHandler,
};
