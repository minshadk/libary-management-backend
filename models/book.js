const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
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
    language:String,
    // copies: {
    //   type: Number,
    //   default: 1,
    // },
  }, { timestamps: true });
  
  const Book = mongoose.model('Book', bookSchema);
  