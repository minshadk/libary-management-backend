const express = require('express')
const router = express.Router()

const book = require('../controllers/book')
const protect = require('../middleware/authMiddleware')

router.get('/borrowedBooks', protect.protect, book.getAllBorrowedBooks)
router.post('/', protect.protect, book.createBook)
router.get('/', book.getAllBooks)
router.get('/:id', book.getBookById)
router.patch('/:id', protect.protect, book.updateBook)
router.delete('/:id', book.deleteBook)

module.exports = router
 