const cron = require('node-cron')
const { generateSecretKey } = require('./auth-utils')

// Generate a secret key every 24 hours
const generateSecretKeySchedular = () => {
  cron.schedule('* * * 1 * *', () => {
    generateSecretKey()
  })
}

module.exports = {
  generateSecretKeySchedular,
}
