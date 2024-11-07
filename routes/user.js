const express = require('express')
const router = express.Router()

const user = require('../controllers/user')

router.post('/signUp', user.createUser)
router.post('/login', user.logIn)
router.get('/', user.getAllUsers)
router.get('/:id', user.getUserById) 
router.patch('/:id', user.updateUser)
router.delete('/:id', user.deleteUser)

module.exports = router
