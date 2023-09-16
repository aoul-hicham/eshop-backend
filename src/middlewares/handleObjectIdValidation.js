const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

const objectIdValidation = (req, res, next) => {
  const userId = req.params.id
  console.log('objectid validation middleware is executed')

  console.log(req.params)

  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('invalid id from midleware')
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'Invalid id has been passed' })
    }
  }

  next()
}

module.exports = objectIdValidation
