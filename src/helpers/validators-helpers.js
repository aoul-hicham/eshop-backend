const mongoose = require('mongoose')

// Method to check provided ObjectId
const checkingObjectId = (
  objectIdParam,
  errorThrowing = true,
  message = 'A non valid id has been provied',
) => {
  const isValidObjectId = mongoose.Types.ObjectId.isValid(objectIdParam)

  if (errorThrowing) {
    if (!isValidObjectId) throw new Error(message)
  } else {
    return isValidObjectId
  }
}

module.exports = {
  checkingObjectId,
}
