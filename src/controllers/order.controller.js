const { StatusCodes } = require('http-status-codes')
const OrderService = require('../services/order-service')
const OrderItemService = require('../services/order-item-service')
const _ = require('lodash')

// Get all orders
const findAllOrders = async (req, res) => {
  try {
    const orders = await OrderService.getAllOrders()

    return res.status(StatusCodes.OK).json({ data: orders })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Get order by id
const findOrderById = async (req, res) => {
  try {
    const orderId = req.params.id

    const order = await OrderService.getOrderById(orderId)

    return res.status(StatusCodes.OK).json(order)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Add an order
const createOrder = async (req, res) => {
  try {
    let orderData = req.body
    const userId = req.auth.userId

    // adding the order
    const addedOrder = OrderService.addOrder(orderData, userId)

    return res.status(StatusCodes.CREATED).json(addedOrder)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err.message)
  }
}

// add order items
const createOrderItem = async (req, res) => {
  try {
    const orderItems = req.body

    const createdOrderItems = await OrderItemService.addOrderItem(orderItems)

    return res.status(StatusCodes.CREATED).json(createdOrderItems)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Sum of orders
const sumOrders = async (req, res) => {
  try {
    // Using aggregation to group all documents into one and sum the total sales
    const totalSales = await OrderService.countingOrders()

    console.log(typeof totalSales)

    return res.status(StatusCodes.OK).json(totalSales)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Get user orders
const getUserOrder = async (req, res) => {
  try {
    const userId = req.params.id

    const userOrders = await OrderService.getUserOrder(userId)

    if (!_.isEmpty(userOrders)) return res.status(StatusCodes.OK).json(userOrders)
    else return res.status(StatusCodes.NO_CONTENT).json([])
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Add order
module.exports = {
  findAllOrders,
  findOrderById,
  createOrder,
  createOrderItem,
  sumOrders,
  getUserOrder,
}
