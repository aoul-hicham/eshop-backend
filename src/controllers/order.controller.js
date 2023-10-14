const { StatusCodes } = require('http-status-codes')
const { Order } = require('../models/order.model')
const { OrderItem } = require('../models/orderItem.model')
const { getOrderTotalPrice } = require('../helpers/order-helper')
const mongoose = require('mongoose')
const _ = require('lodash')

// Get all orders
const findAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: { path: 'product', populate: { path: 'category' } },
      })
      .sort('dateOrdered')

    return res.status(StatusCodes.OK).json({ data: orders })
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
  }
}

// Get order by id
const findOrderById = async (req, res) => {
  try {
    const orderId = req.params.id

    if (!mongoose.Types.ObjectId.isValid(orderId)) throw new Error('Invalid order id has been provided')

    const order = await Order.findById(orderId)

    return res.status(StatusCodes.OK).json(order)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Add an order
const createOrder = async (req, res) => {
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
}

// add order items
const createOrderItem = async (req, res) => {
  try {
    const orderItems = req.body

    const createdOrderItems = await OrderItem.create(orderItems)

    return res.status(StatusCodes.CREATED).json(createdOrderItems)
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message })
  }
}

// Sum of orders
const sumOrders = async (req, res) => {
  try {
    // Using aggregation to group all documents into one and sum the total sales
    const totalSales = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ])

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

    const validUserId = mongoose.Types.ObjectId.isValid(userId)

    if (!validUserId) throw new Error('A non valid user id has been provided')

    const userOrders = await Order.where('user', userId)

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
