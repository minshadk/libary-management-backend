const jwt = require('jsonwebtoken');

const User = require('../models/user')

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
        userData: { token: token, userName: userName ,userType:user.userType},
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400).json({
      status: 'failed',
      message: 'Invalid data send',
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
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
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
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
