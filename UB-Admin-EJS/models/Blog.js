const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  status: { type: String, default: 'Published' }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
