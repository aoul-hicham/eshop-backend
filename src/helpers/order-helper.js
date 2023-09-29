const { Product } = require('../models/product.model')

// Returns the total of a given order
const getOrderTotalPrice = async (orderItems) => {
  const promises = orderItems.map(async (item) => {
    const productId = item.product
    const productQuantity = item.quantity

    const product = await Product.findById(productId).select('price')

    if (product) return product.price * productQuantity
  })

  // waiting all promises to finish to be able to calculate the total price at the end
  // map function doesn't waite an asychronous code to finish to move to the next element
  const prices = await Promise.all(promises)

  const orderTotalPrice = prices.reduce((acc, curr) => acc + curr, 0)

  return orderTotalPrice
}

module.exports = {
  getOrderTotalPrice,
}
