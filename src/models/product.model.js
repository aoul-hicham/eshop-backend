const mongoose = require("mongoose")

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
})

// Model
exports.Product = mongoose.model("Product", productSchema)
