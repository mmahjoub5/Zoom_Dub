const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  email: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model('Message', messageSchema);