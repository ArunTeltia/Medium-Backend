const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  followedUser: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
});

const Follow = mongoose.model("follows", followSchema);

module.exports = Follow;
