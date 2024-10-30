const express = require('express');
const router = express.Router();

const book = require("../controllers/book")

router.post('/', book.createBook);
router.get('/', book.getAllBooks);
router.get('/:id', book.getBookById);
router.patch('/:id', book.updateBook);
router.delete('/:id', book.deleteBook);

module.exports = router