const dotenv = require("dotenv")
const dotenvExpand = require("dotenv-expand")

const setupDotEnv = () => dotenvExpand.expand(dotenv.config())

module.exports = setupDotEnv
