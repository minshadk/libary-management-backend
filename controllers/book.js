const Book = require('../models/book')

exports.createBook = async (req, res) => {
  try {
    const bookOwnerId = req.user._id

    const book = new Book({
      ...req.body,
      bookOwnerId,
    })

    await book.save()
    res.status(201).json(book)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('borrowedUserId')
      .populate('bookOwnerId')
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getAllBorrowedBooks = async (req, res) => {
  try {
    const userId = req.user._id
    console.log(userId)

    const books = await Book.find({
      available: false,
      borrowedUserId: userId,
    }).populate('borrowedUserId')
    // const books = await Book.find()
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
exports.getAllOwnedBooks = async (req, res) => {
  try {
    console.log('get all owned books is called')
    const userId = req.user._id
    console.log(userId)

    const books = await Book.find({
      bookOwnerId: userId,
    }).populate('borrowedUserId')
    console.log(books)
    res.json(books)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author')
      .populate('bookOwnerId')

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.json(book)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateBook = async (req, res) => {
  try {
    const borrowedUserId = req.user._id

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { ...req.body, borrowedUserId },
      { new: true },
    )

    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json(book)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    res.json({ message: 'Book deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
