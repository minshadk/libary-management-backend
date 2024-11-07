const express = require('express')
const router = express.Router()

const comment = require('../controllers/comments')
const protect = require('../middleware/authMiddleware')

router.post('/', protect.protect, comment.createComment)
router.get('/:bookId', comment.getCommentsByBook)
router.put('/:id', comment.updateComment)
router.delete('/:id', comment.deleteComment)

module.exports = router
