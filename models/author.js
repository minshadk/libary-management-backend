const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: String,
    dateOfBirth: Date,
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
  },
  { timestamps: true },
)

const Author = mongoose.model('Author', authorSchema)
