const mongoose = require("mongoose");

const { User, Story, Clap } = require("./models");

const run = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/medium_clone", (error) => {
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

  console.log(await Story.findById(story.id).populate("author"));
};

run()
  .then(() => mongoose.disconnect().then(console.log).catch(console.error))
  .catch(console.error);
