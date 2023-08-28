require("./config/dotenv.config.js")

const express = require("express")
const app = express()

const PORT = 3000

app.get("/", (req, res) => {
  res.send("Hello apis")
  console.log(process.env.API_URL)
})

app.listen(PORT, () => {
  console.log(`Server start listening to the PORT ${PORT}`)
})
