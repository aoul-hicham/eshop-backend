const express = require("express")
const {Product} = require("../models/product.model")
const productRouter = express.Router()

//? Get Products
productRouter.get("/product", async (req, res) => {
  const products = await Product.find()

  if (!products) res.status(404).json({message: "No product found"})
  else res.send(products).json()
})

//? Create product
productRouter.post(`/product/create`, (req, res) => {
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

module.exports = productRouter
