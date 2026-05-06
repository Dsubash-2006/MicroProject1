const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  subject: {
    type: String,
    trim: true,
    required: true,
  },
  condition: {
    type: String,
    trim: true,
    default: "Good",
  },
  description: {
    type: String,
    trim: true,
  },
  sellerName: {
    type: String,
    required: true,
    trim: true,
  },
  sellerEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  pages: Number,
  year: Number,
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
