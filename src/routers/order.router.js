const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { Order } = require('../models/order.model')
const { OrderItem } = require('../models/orderItem.model')
// const { Product } = require('../models/product.model')
const { getOrderTotalPrice } = require('../helpers/order-helper')

const router = express.Router()

// Get all orders
router.get('/all', async (req, res) => {
  try {
    const orders = await Order.find()

    return res.status(StatusCodes.OK).json({ data: orders })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
})

// Add an order
router.post('/add', async (req, res) => {
  try {
    let orderBody = req.body

    // Calculating total order from orderItems
    const orderTotalPrice = await getOrderTotalPrice(orderBody.orderItems)

    // Saving OrderItems first
    const orderItems = await OrderItem.create(orderBody.orderItems)
    // transforming the orderItems array to keep only the ids
    const transformedOrderItems = orderItems.map((item) => item.id)

    // Assign dynamically the required data to be send with the order
    orderBody['totalPrice'] = orderTotalPrice
    orderBody['user'] = req.auth.userId
    orderBody['orderItems'] = transformedOrderItems

    // Order creation
    const order = new Order(orderBody)
    const createdOrder = await order.save()

    return res.status(StatusCodes.CREATED).json(createdOrder)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
})

// add order items
router.post('/add-order-items', async (req, res) => {
  try {
    const orderItems = req.body

    const createdOrderItems = await OrderItem.create(orderItems)

    return res.status(StatusCodes.CREATED).json(createdOrderItems)
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: err.message })
  }
})

// Add order
module.exports = router
