require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


//should i use express-validator for this?
const { usernameValidator } = require("./username-validator-middleware");

const SALT_LENGTH = process.env.SALT_LENGTH;

//if user dont get created it will through an error 
const userSchema = new mongoose.Schema(
  {
    username: {
      required: true,
      type: String,
      unique: true,
      set: (val) => val.toLowerCase(),
      validate: [
        {
          msg: usernameValidator.message,
          validator: usernameValidator.validator,
        },
      ],
    },
    password: {
      required: true,
      type: String,
      minlength: 6,
    },
    avatarURL: String,
    followers: [{ type: mongoose.SchemaTypes.ObjectId, ref: "users" }],
    following: [{ type: mongoose.SchemaTypes.ObjectId, ref: "users" }],
  },
  { timestamps: true }
);

userSchema.virtual("stories", {
  ref: "stories",
  localField: "_id",
  foreignField: "author",
});

userSchema.virtual("claps", {
  ref: "claps",
  localField: "_id",
  foreignField: "user",
});

userSchema.virtual("followersList", {
  ref: "follows",
  localField: "_id",
  foreignField: "followedUser",
});

userSchema.virtual("followingList", {
  ref: "follows",
  localField: "_id",
  foreignField: "follower",
});

//whenever there is a wipe of user from the database, before wiping we have to remove his
//stories and claps
// ?? how to delete all the user that he is following fro thier follow list
// we can create the reference of the followers in the list such that if its deleted,
// it get deleted from the follow list of other users
// Number will need to be updated (DO we need API of WEBHOOK)

//  ?? research for WEBHOOK

userSchema.pre("remove", function cascadeDelete() {
  return mongoose
    .model("follows")
    .remove({
      $or: [{ followedUser: this.id }, { follower: this.id }],
    })
    .then(() => mongoose.model("stories").remove({ author: this.id }))
    .then(() => mongoose.model("claps").remove({ user: this.id }));
});

userSchema.methods.getStories = function getStories() {
  return this.populate("stories")
    .execPopulate()
    .then((user) => user.stories);
};

userSchema.methods.getClaps = function getClaps() {
  return this.populate("claps")
    .execPopulate()
    .then((user) => user.claps);
};

userSchema.methods.getFollowers = async function getFollowers() {
  const followersList = await this.populate("followersList")
    .execPopulate()
    .then((user) => user.followersList);
  return Promise.all(
    followersList.map((follow) =>
      follow
        .populate("follower")
        .execPopulate()
        .then((follow) => follow.follower)
    )
  );
};

userSchema.methods.getFollowing = async function getFollowing() {
  const followingList = await this.populate("followingList")
    .execPopulate()
    .then((user) => user.followingList);

  return Promise.all(
    followingList.map((follow) =>
      follow
        .populate("followedUser")
        .execPopulate()
        .then((follow) => follow.followedUser)
    )
  );
};
// ?? Think can we use virtual?
userSchema.methods.getResponses = function getResponses() {
  return mongoose.model("stories").find({
    parent: { $ne: null },
    author: this._id,
  });
};

userSchema.methods.followUser = function followUser(followedUser) {
  if (this.id === followedUser.id) return null;
  return mongoose.model("follows").create({
    followedUser,
    follower: this,
  });
};

const User = mongoose.model("users", userSchema);

module.exports = User;
