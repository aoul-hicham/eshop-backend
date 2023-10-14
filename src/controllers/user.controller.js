const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user.model')
const { StatusCodes } = require('http-status-codes')
const { checkingObjectId } = require('../helpers/validators-helpers')

// Find all users
const findAllUsers = async (req, res) => {
  try {
    const usersList = await User.find().select('-passwordHash, -__v')

    return res.status(StatusCodes.OK).json({ data: usersList })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Find user by id
const findUserById = async (req, res) => {
  try {
    const userId = req.params.id

    // IN case user is not exist
    checkingObjectId(userId, true, 'Invalid id provided')

    const user = await User.findById(userId).select('-passwordHash')

    if (user) res.status(StatusCodes.OK).json({ user: user })
    else res.status(StatusCodes.NOT_FOUND).json({ user: null })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Create user
const createUser = async (req, res) => {
  try {
    let user = new User(req.body)

    // checking email
    const emailAlreadyExist = await User.findOne({ email: user.email })

    if (emailAlreadyExist) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `The email ${user.email} is already exist` })

    // password encrypt
    user.passwordHash = await bcrypt.hash(user.passwordHash, 10)

    const createdUser = await user.save()

    return res.status(StatusCodes.CREATED).json(createdUser)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Update user
const updateUser = async (req, res) => {
  try {
    const userBody = req.body
    const userId = req.params.id

    await User.findByIdAndUpdate(userId, userBody)

    return res.status(StatusCodes.OK).json({ message: 'User has been updated' })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Delete user
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id
    checkingObjectId(userId)

    await User.findByIdAndDelete(userId)

    return res.status(StatusCodes.NO_CONTENT).send()
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

// User login
const login = async (req, res) => {
  try {
    const userAuth = req.body
    const user = await User.findOne({ email: userAuth.email }).select('name email passwordHash isAdmin')

    // checking user
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ error: 'user is not exist' })

    // password comparison
    const passwordIsValid = await bcrypt.compare(userAuth.password, user.passwordHash)

    if (!passwordIsValid) return res.status(StatusCodes.NO_CONTENT).json({ error: 'email or password are not correct' })

    // Token generation
    const secretKey = process.env.secret_key

    let payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: '24h' })

    return res.status(StatusCodes.OK).json({ token: token })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

// Counting user
const countingUsers = async (req, res) => {
  try {
    const usersCount = await User.find({ isAdmin: false }).count()

    return res.status(StatusCodes.OK).json({ userCount: usersCount })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  updateUser,
  deleteUser,
  login,
  countingUsers,
}
