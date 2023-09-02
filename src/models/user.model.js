const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({})

exports.User = mongoose.model('User', UserSchema)
