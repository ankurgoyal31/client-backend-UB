const mongoose = require('mongoose');
const mediaSchema = new mongoose.Schema({
    category:String,
    title: String,
    description: String,
    url: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Media', mediaSchema);