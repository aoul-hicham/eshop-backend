const express = require("express")
const morgan = require("morgan")
const setupDotEnv = require("./src/util/env-setup")
const setupDatabaseConnection = require("./src/util/db-connection-setup")
const productRouter = require("./src/routers/product.router")


const app = express()
const api = process.env.apiUrl

// Setup dotenv
setupDotEnv()

// Variables

// Middleware calls
app.use(express.json())
app.use(morgan("tiny"))

// Product router
app.use(`${api}/product`, productRouter)

// Database connection
setupDatabaseConnection()

// Starting server
app.listen(process.env.port, () => {
  console.log(`server is running on PORT ${process.env.port}...`)
})
