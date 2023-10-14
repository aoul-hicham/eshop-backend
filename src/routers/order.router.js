const express = require('express')
const OrderController = require('../controllers/order.controller')

const router = express.Router()

// Get all orders
router.get('/all', OrderController.findAllOrders)

// Get order by id
router.get('/get/:id', OrderController.findOrderById)

// Add an order
router.post('/add', OrderController.createOrder)

// add order items
router.post('/add-order-items', OrderController.createOrderItem)

// Sum of orders
router.get('/total-sales', OrderController.sumOrders)

// Get user orders
router.get('/user/:id', OrderController.getUserOrder)

// Add order
module.exports = router
