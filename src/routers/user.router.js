const mongoose = require('mongoose')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user.model')
const { StatusCodes } = require('http-status-codes')

const router = express.Router()

//* Find all users
router.get('/all', async (req, res) => {
  try {
    const usersList = await User.find().select('-passwordHash, -__v')

    return res.status(StatusCodes.OK).json({ data: usersList })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
})

//* Find user by id
router.get('/find/:id', async (req, res) => {
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

//* Create user
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

//* Update user
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

//* Delete user
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

//* User login
router.post('/login', async (req, res) => {
  try {
    const userAuth = req.body
    const user = await User.findOne({ email: userAuth.email }).select(
      'name email passwordHash isAdmin',
    )

    // checking user
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'user is not exist' })

    // password comparison
    const passwordIsValid = await bcrypt.compare(
      userAuth.password,
      user.passwordHash,
    )

    if (!passwordIsValid)
      return res
        .status(StatusCodes.NO_CONTENT)
        .json({ error: 'email or password are not correct' })

    // Token generation
    const secretKey = process.env.secret_key

    let payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '5h' })

    return res.status(StatusCodes.OK).json({ token: token })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
})

//* Counting user
router.get('/count', async (req, res) => {
  try {
    const usersCount = await User.find({ isAdmin: false }).count()

    return res.status(StatusCodes.OK).json({ userCount: usersCount })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
})

module.exports = router
