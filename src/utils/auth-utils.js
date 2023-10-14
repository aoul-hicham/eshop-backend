const dotenv = require('dotenv')
const stringify = require('dotenv-stringify')
const fs = require('fs')

const generateSecretKey = () => {
  // Generate a random secret key
  const secretKey = require('crypto').randomBytes(12).toString('hex')

  // Load the existing environment variables
  const envConfig = dotenv.parse(fs.readFileSync('.env'))

  // Update or append the SECRET_KEY value
  envConfig.SECRET_KEY = secretKey

  // Write the updated environment variables back to the .env file
  fs.writeFileSync('.env', stringify(envConfig))
}

module.exports = {
  generateSecretKey,
}
