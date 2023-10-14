const { pathToRegexp } = require('path-to-regexp')

const publicRoutes = () => {
  const apiUrl = process.env.apiUrl

  return [
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

    // Public folder
    pathToRegexp('/public/uploads/(.*)'),
  ]
}

module.exports = publicRoutes
