const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'OrderItem',
    },
  ],
  shippingAdresse1: {
    type: String,
  },
  shippingAdresse2: {
    type: String,
  },
  city: {
    type: String,
  },
  zip: {
    type: String,
  },
  country: {
    type: String,
  },
  phone: {
    type: Number,
  },
  status: {
    type: String,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  dateOrder: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

exports.Order = mongoose.model('Order', OrderSchema)
