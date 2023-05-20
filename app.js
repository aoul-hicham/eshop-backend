const express = require("express")
const setupDotEnv = require("./config")
const morgan = require("morgan")
const mongoose = require("mongoose")

const app = express()

// setup dotenv
setupDotEnv()

// Middlewares
app.use(express.json())
app.use(morgan("tiny"))

// Schemas
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
})

// Modals
const Product = mongoose.model("Product", productSchema)

// request url
app.get(`${process.env.API_URL}/product`, async (req, res) => {
  const products = await Product.find()
  res.send(products).json()
})

// Create product
app.post(`${process.env.API_URL}/product/create`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  })

  product
    .save()
    .then((productCreated) =>
      res
        .status(201)
        .json({message: "product has been created", productCreated})
    )
    .catch((err) => res.status(500).json({error: err, success: false}))
})

// Connect to database
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(
    console.log(
      `The connection to ${process.env.MONGO_DB_DATABASE_NAME} database has been successfully established`
    )
  )
  .catch((err) => console.log(err))

app.listen(process.env.SERVER_PORT, () =>
  console.log(`The server is running on ${process.env.SERVER_PORT}`)
)
