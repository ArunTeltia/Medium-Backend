const express = require("express");

const {
  exchangeSlugForUser,
  userNotFoundRedirect,
} = require("./user-found");
const {
  userStoriesHandler,
  userFollowingHandler,
  userResponsesHandler,
  userClappedHandler,
} = require("./user-route");

const UserFollowersController = require("./user-followers");



//should i use app? instead of usercontroller
const UserController = express.Router();

//check if user exist or not if not send a data back
UserController.use("/:userNameData", exchangeSlugForUser, userNotFoundRedirect);

//try to find the followers of the user
UserController.use("/followers", UserFollowersController);

//try to get the story of the user
UserController.get("/stories", userStoriesHandler);

UserController.get("/following", userFollowingHandler);

UserController.get("/responses", userResponsesHandler);

UserController.get("/clapped", userClappedHandler);

module.exports = UserController;
