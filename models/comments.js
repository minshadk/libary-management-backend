const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    bookId: {
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
  },
  { timestamps: true },
)

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment
