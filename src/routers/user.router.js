const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')

const { User } = require('../models/user.model')
const { StatusCodes } = require('http-status-codes')

const router = express.Router()

// Find all users
router.get('/all', async (req, res) => {
  try {
    const usersList = await User.find().select('-passwordHash, -__v')

    return res.status(StatusCodes.OK).json({ data: usersList })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
})

// Find user by id
router.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id

    // IN case user is not exist
    const validUserId = mongoose.Types.ObjectId.isValid(userId)

    if (!validUserId)
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Invalid id provided' })

    const user = await User.findById(userId).select('-passwordHash')

    if (user) res.status(StatusCodes.OK).json({ user: user })
    else res.status(StatusCodes.NOT_FOUND).json({ user: null })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
})

// Create user
router.post('/create', async (req, res) => {
  try {
    let user = new User(req.body)

    // checking email
    const emailAlreadyExist = await User.findOne({ email: user.email })

    if (emailAlreadyExist)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: `The email ${user.email} is already exist` })

    // password encrypt
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10)

    const createdUser = await user.save()

    return res.status(StatusCodes.CREATED).json(createdUser)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
})

// Update user
router.put('/update/:id', async (req, res) => {
  try {
    const userBody = req.body
    const userId = req.params.id

    await User.findByIdAndUpdate(userId, userBody)

    return res.status(StatusCodes.OK).json({ message: 'User has been updated' })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
})

// Delete user
router.delete('/delete/:id', async (req, res) => {
  try {
    const userId = req.params.id
    const isNotValidUserId = !mongoose.Types.ObjectId.isValid(userId)

    if (isNotValidUserId)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: 'Invalid user id' })

    await User.findByIdAndDelete(userId)

    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

module.exports = router
