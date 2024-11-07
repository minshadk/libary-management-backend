const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    // authorId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Author',
    //   required: true,
    // },
    coverUrl: {
      type: String,
    },
    author: {
      type: String,
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    genre: String,
    publishedYear: Number,
    available: {
      type: Boolean,
      default: true,
    },
    language: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pickedDate: {  
      type: Date,
    },
  },
  { timestamps: true },
)

const Book = mongoose.model('Book', bookSchema)
module.exports = Book
