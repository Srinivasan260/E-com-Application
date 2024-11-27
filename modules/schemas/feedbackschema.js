const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
  feedback: { type: String, required: true },
  rating: { type: Number, required: true }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
