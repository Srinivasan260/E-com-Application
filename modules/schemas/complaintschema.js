const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
