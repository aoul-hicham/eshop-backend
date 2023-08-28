const express = require("express")
const morgan = require("morgan")
const setupDotEnv = require("./src/util/env-setup")
const setupDatabaseConnection = require("./src/util/db-connection-setup")

const app = express()

// Setup dotenv
setupDotEnv()

// Variables
const api = process.env.apiUrl
const products = require("./products")

// Middleware calls
app.use(express.json())
app.use(morgan("tiny"))

// Home page
app.get(`${api}`, (req, res) => {
  res.send("Home page")
})

// Products
app.get(`${api}/products`, (req, res) => {
  res.json(products)
})

// Database connection
setupDatabaseConnection()

// Starting server
app.listen(process.env.port, () => {
  console.log(`server is running on PORT ${process.env.port}...`)
})
