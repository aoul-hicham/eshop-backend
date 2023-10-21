const { Category } = require('../models/category.model')

// Get Category by id
const getCategoryById = async (categoryId) => {
  return await Category.findById(categoryId)
}

// Create category
const createCategory = async (categoryData) => {
  const category = new Category(categoryData)
  return await category.save()
}

// Get all categories
const getAllCategories = async () => {
  return await Category.find()
}

// Delete category
const deleteCategory = async (categoryId) => {
  return await Category.findByIdAndDelete(categoryId).exec()
}

// Update category
const updateCategory = async (categoryId, categoryData) => {
  return await Category.findByIdAndUpdate(categoryId, categoryData)
}

module.exports = {
  getCategoryById,
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
}
