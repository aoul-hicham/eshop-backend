const mongoose = require('mongoose')

const OrderItemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  quantity: {
    type: Number,
    min: 1,
    required: true,
  },
})

exports.OrderItem = mongoose.model('OrderItem', OrderItemSchema)
