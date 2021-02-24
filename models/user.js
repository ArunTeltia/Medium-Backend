const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  avatar_url: String,
  stories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Story" }],
  responses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Story" }],
  claps: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Clap" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
