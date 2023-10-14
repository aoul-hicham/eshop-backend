const express = require('express')
const { uploadOptions } = require('../middlewares/product-image-upload-middleware')
const ProductController = require('../controllers/product.controller')

const router = express.Router()

// Get all products
router.get('/all', ProductController.findAllProducts)

// Get product by id
router.get('/find/:id', ProductController.findProductById)

// Counting products
router.get('/count', ProductController.countingProducts)

// Create product
router.post(`/create`, uploadOptions.single('image'), ProductController.createProduct)

// Delete specific product
router.delete('/:id', ProductController.deleteProduct)

// Update product
router.put('/:id', ProductController.updateProduct)

// Update product gallery images : PUT product/update-gallery/:productId
router.put('/update-gallery/:productId', uploadOptions.array('images', 10), ProductController.updateProductGallery)

// Get Featured product
router.get('/get/featured/:count?', ProductController.countingFeatureProducts)

module.exports = router
