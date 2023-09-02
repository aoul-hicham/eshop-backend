const express = require('express')
const { Product } = require('../models/product.model')

const router = express.Router()

// Get products
router.get('/list', async (req, res) => {
  try {
    const productList = await Product.find()

    res.json({ data: productList })
  } catch (err) {
    res.status(500).json({ error: err })
  }
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
    res.status(500).json({ error: err, success: false })
  }
})

module.exports = router
