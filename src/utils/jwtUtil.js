const { expressjwt } = require('express-jwt')

const jwtAuth = () => {
  const secret = process.env.secret_key
  const apiUrl = process.env.apiUrl

  return expressjwt({
    secret,
    algorithms: ['HS256'],
  }).unless({ path: [`${apiUrl}/user/login`] })
}

module.exports = { jwtAuth }
