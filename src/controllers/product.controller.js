const { StatusCodes } = require('http-status-codes')
const { Product } = require('../models/product.model')
const { Category } = require('../models/category.model')
const { checkingObjectId } = require('../helpers/validators-helpers')
const _ = require('lodash')

// Create Product
const createProduct = async (req, res) => {
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
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err, success: false })
  }
}

// Get all products
const findAllProducts = async (req, res) => {
  try {
    const productList = await Product.find()
    const countProducts = await Product.count()

    res.json({ data: { products: productList, count: countProducts } })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Find product by id
const findProductById = async (req, res) => {
  try {
    const productData = await Product.findById(req.params.id).populate(
      'category',
    )

    res.status(StatusCodes.OK).json({ data: productData })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Counting products
const countingProducts = async (req, res) => {
  const productCount = await Product.find().count()

  res.status(StatusCodes.OK).json({ data: { productCount: productCount } })
}

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id
    await Product.findByIdAndDelete(productId)

    res.status(204).send()
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Update Product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id

    const newProductData = req.body.product

    await Product.findByIdAndUpdate(productId, newProductData)

    res.status(200).json(newProductData)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Update product Galery
const updateProductGallery = async (req, res) => {
  try {
    const productId = req.params.productId
    const productImages = []

    // custom objectId validator
    checkingObjectId(productId)

    //
    if (!_.isEmpty(req.files)) {
      req.files.map((file) => {
        productImages.push(file.filename)
      })
    }

    return res.status(200).json(req.files)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
}

// Counting featured products
const countingFeatureProducts = async (req, res) => {
  try {
    const featuredProductCount = req.params.count ? req.params.count : 0

    const featuredProduct = await Product.find({ isFeatured: true }).limit(
      featuredProductCount,
    )

    res.status(200).json({ data: featuredProduct })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

module.exports = {
  findAllProducts,
  findProductById,
  countingProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  updateProductGallery,
  countingFeatureProducts,
}
