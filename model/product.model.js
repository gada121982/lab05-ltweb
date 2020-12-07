const { Schema, model } = require('mongoose')

const Product = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
  },
  active: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  currentPrice: {
    type: Number,
    required: true
  },
  voucherId: {
    type: String
  },
  describe: {
    type: String
  },
  categoryId: {
    type: String,
    required: true
  },
  discount: {
    type: Number
  },
  rating: {
    type: Number
  },
  countRating: {
    type: Number
  },
  point: {
    type: Number
  }
}, {
  timestamps: true
})

module.exports = model('product', Product, 'product')