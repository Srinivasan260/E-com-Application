const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  Quantity: { type: Number, required: true },
  category: { type: String }
});

module.exports = mongoose.model('products', ProductSchema);
