const express = require("express")

const Product = require("../models/product.model")
const app = express()
const router = express.Router()

// Get products
router.get(`/get`, async (req, res) => {
  const productList = await Product.find()

  res.json(productList)
})

// Create product
router.post(`/create`, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock,
    })

    const createdProduct = await product.save()

    res.status(201).json(createdProduct)
  } catch (err) {
    res.status(500).json({error: err, success: false})
  }
})

module.exports = router
