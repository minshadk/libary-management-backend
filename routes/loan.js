const express = require('express');
const router = express.Router();

router.post('/', libraryController.createLoan);
router.get('/', libraryController.getAllLoans);
router.get('/:id', libraryController.getLoanById);
router.put('/:id/return', libraryController.returnBook);

module.exports = router