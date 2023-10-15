const { User } = require('../models/user.model')

// Get users
const getUsers = async () => {
  return await User.find()
}

// Find user by id
const findUserById = async (userId) => {
  return await User.findById(userId).select('-passwordHash')
}

// Find user email
const findUserByEmail = async (userEmail) => {
  return await User.findOne({ email: userEmail })
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
