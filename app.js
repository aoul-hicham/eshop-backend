const express = require("express")
const morgan = require("morgan")
const setupDotEnv = require("./src/util/env-setup")
const setupDatabaseConnection = require("./src/util/db-connection-setup")
const productRouter = require("./src/routers/product.router")
const categoryRouter = require("./src/routers/category.router")
const cors = require("cors")
const app = express()

// Setup dotenv
setupDotEnv()

const api = process.env.apiUrl

// enable cors origin
app.options("*", cors())

// Middleware calls
app.use(express.json())
app.use(morgan("tiny"))

// Routers
app.use(`${api}/product`, productRouter)
app.use(`${api}/category`, categoryRouter)

// Database connection
setupDatabaseConnection()

// Running server
app.listen(process.env.port, () => {
  console.log(`server is running on PORT ${process.env.port}... ${api}`)
})
