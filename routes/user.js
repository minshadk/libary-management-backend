const express = require('express');
const router = express.Router();

router.post('/', libraryController.createUser);
router.get('/', libraryController.getAllUsers);
router.get('/:id', libraryController.getUserById);
router.put('/:id', libraryController.updateUser);
router.delete('/:id', libraryController.deleteUser);

module.exports = router