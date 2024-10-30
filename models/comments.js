const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    comment: {
      type: String,
    },
    // likes: {
    //   type: Array,
    //   default: [],
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);

 