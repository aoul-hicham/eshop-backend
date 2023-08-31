const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: true,
  },
  richDescription: {
    type: String,
    require: false,
  },
  image: {
    type: String,
    default: '',
  },
  images: [
    {
      type: String,
    },
  ],
  brand: {
    type: String,
    default: '',
  },
  countInStock: {
    type: Number,
    required: true,
  },
});

exports.Product = mongoose.model('Product', productSchema);
