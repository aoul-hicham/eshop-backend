const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  orderItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'OrderItem',
      required: true,
    },
  ],
  shippingAdresse1: {
    type: String,
    required: true,
  },
  shippingAdresse2: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    require: true,
    default: 'Pending',
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  dateOrdered: {
    type: Date,
    required: true,
    default: Date.now,
  },
})

OrderSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

OrderSchema.set('toJSON', {
  virtuals: true,
})

exports.Order = mongoose.model('Order', OrderSchema)
