const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
  },
  { timestamps: true },
)

const User = mongoose.model('User', userSchema)
module.exports = User;