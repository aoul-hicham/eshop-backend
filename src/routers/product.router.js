const express = require('express')
const { Product } = require('../models/product.model')
const { Category } = require('../models/category.model')
const { StatusCodes } = require('http-status-codes')
const { uploadOptions } = require('../middlewares/product-image-upload-middleware')

const router = express.Router()

// Get all products
router.get('/all', async (req, res) => {
  try {
    const productList = await Product.find()
    const countProducts = await Product.count()

    res.json({ data: { products: productList, count: countProducts } })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
})

// Get product by id
router.get('/find/:id', async (req, res) => {
  try {
    const productData = await Product.findById(req.params.id).populate(
      'category',
    )

    res.status(StatusCodes.OK).json({ data: productData })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
})

// Counting products
router.get('/count', async (req, res) => {
  const productCount = await Product.find().count()

  res.status(StatusCodes.OK).json({ data: { productCount: productCount } })
})

// Create product
router.post(`/create`, uploadOptions.single('image'), async (req, res) => {
  try {
    // cheking category if exist
    const categoryData = await Category.findById(req.body.category)

    if (!categoryData)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `The category provided is not exist` })

    // Creating the produt
    const productData = req.body

    // Overriding the image filename to the full path
    productData['image'] = req.file.filename

    const product = new Product(productData)

    const createdProduct = await product.save()

    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, success: false })
  }
})

// Delete specific product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id
    await Product.findByIdAndDelete(productId)

    res.status(204).send()
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
})

// Update product
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id

    const newProductData = req.body.product

    await Product.findByIdAndUpdate(productId, newProductData)

    res.status(200).json(newProductData)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
})

// Get Featured product
router.get('/get/featured/:count?', async (req, res) => {
  try {
    const featuredProductCount = req.params.count ? req.params.count : 0

    const featuredProduct = await Product.find({ isFeatured: true }).limit(
      featuredProductCount,
    )

    res.status(200).json({ data: featuredProduct })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
})

module.exports = router
