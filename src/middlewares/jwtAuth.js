const { expressjwt } = require('express-jwt')
const { pathToRegexp } = require('path-to-regexp')

const jwtAuth = () => {
  const secret = process.env.secret_key
  const apiUrl = process.env.apiUrl

  return expressjwt({
    secret,
    algorithms: ['HS256'],
  }).unless({
    path: [
      // User based APIs
      `${apiUrl}/user/login`,
      `${apiUrl}/user/create`,

      // Product based APIs
      `${apiUrl}/product/all`,
      pathToRegexp(`${apiUrl}/product/find/:id`),
      `${apiUrl}/product/get/featured`,

      // Category based APIs
      {
        url: pathToRegexp(`${apiUrl}/category/:id`),
        methods: ['GET', 'OPTIONS'],
      },
      `${apiUrl}/category/list`,
    ],
  })
}

module.exports = { jwtAuth }
