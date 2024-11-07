const Comment = require('../models/comments')
const Book = require('../models/book')
const User = require('../models/user')

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const userId = req.user._id
    const { bookId, comment } = req.body
    console.log(bookId, userId, comment)

    // Check if the bookId and userId exist
    const bookExists = await Book.findById(bookId)
    // console.log(bookExists)
    const userExists = await User.findById(userId)
    console.log(userExists)
    if (!bookExists) return res.status(404).json({ message: 'Book not found' })
    if (!userExists) return res.status(404).json({ message: 'User not found' })

    const newComment = new Comment({ bookId, userId, comment })
    await newComment.save()
    res.status(200).json(newComment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Get all comments for a specific book
exports.getCommentsByBook = async (req, res) => {
  try {
    const { bookId } = req.params
    const comments = await Comment.find({ bookId: bookId }).populate(
      'userId',
      'userName',
    )
    res.json(comments)
  } catch (error) {
    res.status(500).json({ status: 'success', message: error.message })
  }
}

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params
    const { comment } = req.body

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment },
      { new: true },
    )
    if (!updatedComment)
      return res.status(404).json({ message: 'Comment not found' })
    res.json(updatedComment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params

    const deletedComment = await Comment.findByIdAndDelete(id)
    if (!deletedComment)
      return res.status(404).json({ message: 'Comment not found' })
    res.json({ message: 'Comment deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
