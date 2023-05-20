const express = require("express")
const setupDotEnv = require("./util/env.setup")
const setupDatabaseConnection = require("./util/db-connection.setup")
const morgan = require("morgan")
const productRouter = require("./routers/product.router")

const app = express()

//? setup dotenv
setupDotEnv()

//? Middlewares call
app.use(express.json())
app.use(morgan("tiny"))
app.use(process.env.API_URL, productRouter)

//? Connect to database
setupDatabaseConnection()

//? Server running
app.listen(process.env.SERVER_PORT, () =>
  console.log(`The server is running on ${process.env.SERVER_PORT}`)
)
