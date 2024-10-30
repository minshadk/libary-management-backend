const mongoose = require("mongoose");

const loanSchema = new mongoose.Schema({
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
    borrowedDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnDate: Date,
  }, { timestamps: true });
  
  const Loan = mongoose.model('Loan', loanSchema);
  