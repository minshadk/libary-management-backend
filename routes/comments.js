const express = require('express');
const router = express.Router();

router.post('/', commentController.createComment);
router.get('/:bookId', commentController.getCommentsByBook);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);
module.exports = router