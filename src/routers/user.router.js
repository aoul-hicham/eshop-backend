const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

//* Find all users
router.get('/all', UserController.findAllUsers)

//* Find user by id
router.get('/find/:id', UserController.findUserById)

//* Create user
router.post('/create', UserController.createUser)

//* Update user
router.put('/update/:id', UserController.updateUser)

//* Delete user
router.delete('/delete/:id', UserController.deleteUser)

//* User login
router.post('/login', UserController.login)

//* Counting user
router.get('/count', UserController.countingUsers)

module.exports = router
