const { StatusCodes } = require('http-status-codes')
const { checkingObjectId } = require('../helpers/validators-helpers')
const _ = require('lodash')

const CategoryService = require('../services/category-service')
const ProductService = require('../services/product-service')
const logger = require('../utils/logger-util')

// Create Product
const createProduct = async (req, res) => {
  try {
    // cheking if the category is exist
    const categoryData = await CategoryService.getCategoryById(req.body.category)

    console.log(categoryData)

    if (!categoryData)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `The category provided is not exist` })

    // Creating the produt
    const productData = req.body

    // Overriding the image filename to the full path
    productData['image'] = req.file.filename

    const createdProduct = await ProductService.createProduct(productData)

    res.status(StatusCodes.CREATED).json(createdProduct)
  } catch (err) {
    logger.error(err)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Get all products
const findAllProducts = async (req, res) => {
  try {
    const products = await ProductService.getAllProducts()
    const counting = await ProductService.countingProducts()
    res.json({
      data: {
        products: products,
        count: counting,
      },
    })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Find product by id
const findProductById = async (req, res) => {
  try {
    const product = await ProductService.getProductById(req.params.id, 'category')
    res.status(StatusCodes.OK).json({ data: product })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Counting products
const countingProducts = async (req, res) => {
  const productCounts = await ProductService.countingProducts()
  res.status(StatusCodes.OK).json({ data: { productCount: productCounts } })
}

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    checkingObjectId(req.params.id)
    await ProductService.deleteProduct(req.params.id)

    res.status(204).send()
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Update Product
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id

    // checking the product id
    checkingObjectId(productId)

    const newProductData = req.body.product

    await ProductService.updateProduct(productId, newProductData)

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

    if (!_.isEmpty(req.files)) {
      req.files.map((file) => {
        productImages.push(file.filename)
      })
    }

    return res.status(200).json(req.files)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Counting featured products
const countingFeatureProducts = async (req, res) => {
  try {
    const limit = req.params.count ? req.params.count : 0
    const featuredProduct = await ProductService.getFeaturedProducts(limit)

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
