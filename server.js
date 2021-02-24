const mongoose = require("mongoose");
require("dotenv").config();

const { User, Story, Clap } = require("./models");

const run = async () => {
  mongoose.connect(process.env.MONGO_URI, (error) => {
    throw new Error(error);
  });

  const user = await User.create({
    username: "Arun",
    avatar_url: "test@test.com",
  });
  const story = await Story.create({
    title: "title",
    body: "body",
    author: user._id,
    parent: null,
  });

  console.log(user);
  await user.save();
  console.log(await Story.findById(story.id).populate("author"));
  await story.save();
};

run()
  .then(() =>
    mongoose.disconnect().then(console.log("hello")).catch(console.error)
  )
  .catch(console.error);
