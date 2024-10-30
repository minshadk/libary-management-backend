const Loan = require('../models/loan');

exports.createLoan = async (req, res) => {
    try {
      const loan = new Loan(req.body);
      await loan.save();
      res.status(201).json(loan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  exports.getAllLoans = async (req, res) => {
    try {
      const loans = await Loan.find().populate('book user');
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getLoanById = async (req, res) => {
    try {
      const loan = await Loan.findById(req.params.id).populate('book user');
      if (!loan) return res.status(404).json({ message: 'Loan not found' });
      res.json(loan);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.returnBook = async (req, res) => {
    try {
      const loan = await Loan.findById(req.params.id);
      if (!loan) return res.status(404).json({ message: 'Loan not found' });
      loan.returnDate = new Date();
      await loan.save();
      res.json(loan);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  