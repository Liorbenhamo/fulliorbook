const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  imgurl: {
    type: String,
  },
  comment: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  userliked: [
    {
      type: String,
      required: false,
    },
  ],
  comments: [
    {
      type: String,
      required: false,
    },
  ],
  username: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: false,
  },
});
module.exports = mongoose.model("posts", postsSchema);
