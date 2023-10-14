const { StatusCodes } = require('http-status-codes')

const handlingUnauthorizedRequests = (err, req, res, next) => {
  let responseMessage = null

  if (err.name === 'UnauthorizedError') {
    if (err.code === 'invalid_token') {
      if (err.inner.message === 'jwt expired')
        responseMessage = 'Token was expired'
      else if (err.inner.message === 'invalid signature')
        responseMessage = 'Invalid provided token'
    } else if (err.code === 'credentials_required') {
      responseMessage = 'No token provided'
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({ error: responseMessage })
  }

  next()
}

module.exports = handlingUnauthorizedRequests
