const { expressjwt } = require('express-jwt')
const publicRoutes = require('../utils/publicRoutes')

const jwtAuth = () => {
  const secret = process.env.secret_key

  return expressjwt({
    secret,
    algorithms: ['HS256'],
    isRevoked: isRevoked,
  }).unless({
    path: publicRoutes(),
  })
}

const isRevoked = (req, token) => {
  if (!token.payload.isAdmin) return true
}

module.exports = { jwtAuth }
