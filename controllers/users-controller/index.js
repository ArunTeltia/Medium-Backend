const express = require("express");
const {
  verifyPayload,
  checkDuplicate,
  registerUser,
} = require("./user-registration");
const {
  exchangeSlugForUser,
  userNotFoundRedirect,
  UserController,
} = require("./user-controller");

const UsersController = express.Router();

UsersController.post("/", verifyPayload, checkDuplicate, registerUser);

UsersController.use(
  "/:usernameSlug",
  exchangeSlugForUser,
  userNotFoundRedirect,
  UserController
);

module.exports = UsersController;
