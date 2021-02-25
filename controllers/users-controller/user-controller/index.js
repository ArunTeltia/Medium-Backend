const express = require("express");
const routeHandlers = require("./user-route-handlers");
const UserFollowersController = require("./user-follow-controller");
const {
  exchangeSlugForUser,
  userNotFoundRedirect,
} = require("./user-controller-middleware");

const UserController = express.Router();

UserController.get("/stories", routeHandlers.stories);
UserController.use("/followers", UserFollowersController);
UserController.get("/following", routeHandlers.following);
UserController.get("/responses", routeHandlers.responses);
UserController.get("/clapped", routeHandlers.clappedStories);

module.exports = {
  exchangeSlugForUser,
  userNotFoundRedirect,
  UserController,
};
