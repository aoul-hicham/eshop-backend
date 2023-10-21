const { Order } = require('../models/order.model')
const OrderItemService = require('../services/order-item-service')
const ProductService = require('../services/product-service')
const { checkingObjectId } = require('../helpers/validators-helpers.js')

// Get all orders
const getAllOrders = async () => {
  const orders = await Order.find()
    .populate('user', 'name')
    .populate({
      path: 'orderItems',
      populate: { path: 'product', populate: { path: 'category' } },
    })
    .sort('dateOrdered')

  return orders
}

// Get order by id
const getOrderById = async (orderId) => {
  checkingObjectId(orderId)

  return await Order.findById(orderId)
}

// Add an order
const addOrder = async (orderData, userId) => {
  // Calculating total order from orderItems
  const orderTotalPrice = await getOrderTotalPrice(orderData.orderItems)

  // Saving OrderItems first
  const orderItems = await OrderItemService.addOrderItem(orderData.orderItems)

  // Assign dynamically the required data to be send with the order
  orderData['totalPrice'] = orderTotalPrice
  orderData['user'] = userId
  orderData['orderItems'] = orderItems

  // Order creation
  const order = new Order(orderData)
  const createdOrder = await order.save()

  return createdOrder
}

// Sum of orders
const countingOrders = async () => {
  // Using aggregation to group all documents into one and sum the total sales
  return await Order.aggregate([
    {
      $group: {
        _id: null,
        totalSales: { $sum: '$totalPrice' },
      },
    },
  ])
}

// Get user orders
const getUserOrder = async (userId) => {
  checkingObjectId(userId)

  return await Order.where('user', userId)
}

// Calculate order total price
const getOrderTotalPrice = async (orderItems) => {
  const promises = orderItems.map(async (item) => {
    const productId = item.product
    const productQuantity = item.quantity

    const product = await ProductService.getProductById(productId)

    if (product) return product.price * productQuantity
  })

  //-- waiting all promises to finish to be able to calculate the total price at the end
  //-- map function doesn't waite an asychronous code to finish to move to the next element
  const prices = await Promise.all(promises)

  const orderTotalPrice = prices.reduce((acc, curr) => acc + curr, 0)

  return orderTotalPrice
}

// Add order
module.exports = {
  getAllOrders,
  getOrderById,
  addOrder,
  countingOrders,
  getUserOrder,
  getOrderTotalPrice,
}
