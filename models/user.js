const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // membershipDate: {
    //   type: Date,
    //   default: Date.now,
    // },
    // borrowedBooks: [
    //   {
    //     book: {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: 'Book',
    //     },
    //     borrowedDate: {
    //       type: Date,
    //       default: Date.now,
    //     },
    //     dueDate: Date,
    //   },
    // ],
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)
