const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    publishedAt: {
      type: Date,
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
    parent: { type: mongoose.SchemaTypes.ObjectId, ref: "stories" },
  },
  { timestamps: true }
);

storySchema.virtual("claps", {
  ref: "claps",
  localField: "_id",
  foreignField: "story",
});

storySchema.virtual("clapsCount", {
  ref: "claps",
  localField: "_id",
  foreignField: "story",
  count: true,
});

storySchema.virtual("replies", {
  ref: "stories",
  localField: "_id",
  foreignField: "parent",
});

storySchema.virtual("repliesCount", {
  ref: "stories",
  localField: "_id",
  foreignField: "replies",
  count: true,
});

const Story = mongoose.model("stories", storySchema);

module.exports = Story;

//let story = await Story.create({title: "How to use Node like Pro",....})
// extract claps from story directly by story.clapsCoint
// replies ---> story.replies
