const { User } = require('../models/user.model')

// Get users
const getUsers = async (projection = '') => {
  return await User.find().select(projection)
}

// Find user by id
const findUserById = async (userId, projection) => {
  return await User.findById(userId).select(projection)
}

// Find user email
const findUserByEmail = async (userEmail, projection = '') => {
  return await User.findOne({ email: userEmail }).select(projection)
}

// Counting users
const countingUsers = async () => {
  return await User.find({ isAdmin: false }).count()
}

// Create user
const createUser = async (user) => {
  return await user.save()
}

// Update user
const updateUser = async (userId, userData) => {
  return await User.findByIdAndUpdate(userId, userData)
}

// Delete user
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId)
}

module.exports = {
  getUsers,
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  countingUsers,
}
