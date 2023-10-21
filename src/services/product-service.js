const { Product } = require('../models/product.model')

// create product
const createProduct = async (productData) => {
  const product = new Product(productData)
  const createdProduct = await product.save()

  return createdProduct
}

// Get all products
const getAllProducts = async () => {
  return await Product.find()
}

// Get featured products
const getFeaturedProducts = async (limit = 0) => {
  return await Product.find({ isFeatured: true }).limit(limit)
}

// Counting products
const countingProducts = async (featuredOnly = false) => {
  const countingDate = featuredOnly
    ? await Product.select({ isFeatured: true }).count()
    : await Product.count()
  return countingDate
}

// Get product by id
const getProductById = async (productId, populate = '') => {
  return await Product.findById(productId).populate(populate)
}

// Delete product
const deleteProduct = async (productId) => {
  return await Product.findByIdAndDelete(productId)
}

// Update product
const updateProduct = async (productId, productData) => {
  const product = Product.findByIdAndUpdate(productId, productData)
  return product
}

module.exports = {
  createProduct,
  getAllProducts,
  getFeaturedProducts,
  countingProducts,
  getProductById,
  deleteProduct,
  updateProduct,
}
