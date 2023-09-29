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

OrderItemSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

OrderItemSchema.set('toJSON', {
  virtuals: true,
})

exports.OrderItem = mongoose.model('OrderItem', OrderItemSchema)
