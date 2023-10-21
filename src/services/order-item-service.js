const { OrderItem } = require('..//models/orderItem.model')

// Add order item
const addOrderItem = async (orderItemData) => {
  const orderItems = await OrderItem.create(orderItemData)

  const transformedOrderItems = orderItems.map((item) => item.id)

  return transformedOrderItems
}

module.exports = { addOrderItem }
