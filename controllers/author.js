const Author = require('../models/author');
// const Book = require('../models/book');

// Create a new author
exports.createAuthor = async (req, res) => {
  try {
    const author = new Author(req.body);
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all authors with their books
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.find().populate('books');
    res.json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get an author by ID with their books
exports.getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate('books');
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an author
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: 'Author not found' });
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
