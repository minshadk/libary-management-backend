const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Book = require('../models/book')
const Comments = require('../models/comments')

exports.createUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
}

exports.logIn = async (req, res) => {
  const { userName, password } = req.body
  try {
    const user = await User.findOne({
      userName: userName,
      password: password,
    })

    const createToken = (_id) => {
      return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
    }

    const token = createToken(user._id)

    res.status(201).json({
      message: 'Login success full',
      status: 'success',
      data: {
        userData: { token: token, userName: userName, userType: user.userType },
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'failed',
      message: 'Invalid user credentials',
    })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    })
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await User.findByIdAndDelete(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    await Book.deleteMany({ bookOwnerId: userId })

    const deletedComments = await Comments.deleteMany({ userId: userId })
    console.log('deleted comments')
    console.log(deletedComments)

    const BookavilabeUpdated = await Book.updateMany(
      { borrowedUserId: userId },
      { available: true },
    )
    console.log('updated books')

    console.log(BookavilabeUpdated)
    await User.findByIdAndDelete(userId)

    res.json({ message: 'User and associated data deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
