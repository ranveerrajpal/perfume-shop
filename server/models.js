const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  author: String,
  rating: { type: Number, min: 1, max: 5 },
  title: String,
  body: String,
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  tagline: String,
  description: String,
  price: Number,
  category: String,
  notes: {
    top: [String],
    middle: [String],
    base: [String]
  },
  sizes: [{ ml: Number, price: Number }],
  images: [String],
  badge: String,
  rating: Number,
  reviewCount: Number
});

const Product = mongoose.model('Product', productSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = { Product, Review };
