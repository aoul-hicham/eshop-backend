const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/category.controller')

//* Get all categories
router.get('/list', CategoryController.findAllCategories)

//* Get category by id
router.get('/:id', CategoryController.findCatgoryById)

//* Create a catgeory
router.post('/create', CategoryController.createCategory)

//* Delete Category by id
router.delete('/:id', CategoryController.deleteCategory)

//* Update category
router.put('/', CategoryController.updateCategory)

module.exports = router
