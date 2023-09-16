const express = require("express")
const morgan = require("morgan")
const setupDotEnv = require("./src/utils/env-setup")
const setupDatabaseConnection = require("./src/utils/db-connection-setup")
const productRouter = require("./src/routers/product.router")
const categoryRouter = require("./src/routers/category.router")
const userRouter = require("./src/routers/user.router")
const cors = require("cors")
const {generateSecretKeySchedular} = require("./src/utils/scheduleUtils")
const {jwtAuth} = require("./src/utils/jwtUtil")
const handleUnAuthRequests = require("./src/middlewares/handleUnAuthRequests")

const app = express()

// Utilities
setupDotEnv() //* setup dotenv and dotenv expand
setupDatabaseConnection()
generateSecretKeySchedular() //* This function generates secret key every 24 Hours

const api = process.env.apiUrl

// enable cors origin
app.options("*", cors())

// Middleware calls
app.use(express.json())
app.use(morgan("tiny"))
app.use(jwtAuth())
app.use(handleUnAuthRequests)

// Routers
app.use(`${api}/product`, productRouter)
app.use(`${api}/category`, categoryRouter)
app.use(`${api}/user`, userRouter)

// Running server
app.listen(process.env.port, () => {
  console.log(`server is running on PORT ${process.env.port}`)
})
