/*
This middleware used to handle un authorized tokens and when to revoke a tokken
The error thrown is catched inside handlingUnauthorizedRequests middleware
*/
const { expressjwt } = require('express-jwt')
const publicRoutes = require('../utils/public-routes')

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

//* When token should be revoked
const isRevoked = (req, token) => {
  if (!token.payload.isAdmin) return true
}

module.exports = { jwtAuth }
