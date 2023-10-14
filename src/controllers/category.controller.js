const { StatusCodes } = require('http-status-codes')
const { Category } = require('../models/category.model')

// Create category
const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body)

    const categoryCreated = await category.save()

    res.status(StatusCodes.CREATED).json(categoryCreated)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Get all categories
const findAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()

    res.status(StatusCodes.OK).json({ data: categories })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Get category by id
const findCatgoryById = async (req, res) => {
  try {
    const categoryId = req.params.id
    const category = await Category.findById(categoryId).exec()

    if (!category) res.status(StatusCodes.NOT_FOUND).json({ error: 'No category found' })
    else res.status(StatusCodes.OK).json({ data: category })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    await Category.findByIdAndDelete(categoryId).exec()

    res.status(StatusCodes.NO_CONTENT).json({ message: `The category ${categoryId} has been deleted !` })
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

// Update category
const updateCategory = async (req, res) => {
  try {
    const categoryId = req.body.categoryId
    const categoryObject = req.body.category

    const categoryUpdated = await Category.findByIdAndUpdate(categoryId, categoryObject)

    res.status(StatusCodes.NO_CONTENT).json(categoryUpdated)
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err })
  }
}

module.exports = {
  findAllCategories,
  findCatgoryById,
  createCategory,
  deleteCategory,
  updateCategory,
}
