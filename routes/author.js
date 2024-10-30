const express = require('express');
const router = express.Router();

const author = require("../controllers/author")


router.post('/', author.createAuthor);
router.get('/', author.getAllAuthors);
router.get('/:id', author.getAuthorById);
router.put('/:id', author.updateAuthor);
router.delete('/:id', author.deleteAuthor);

module.exports = router