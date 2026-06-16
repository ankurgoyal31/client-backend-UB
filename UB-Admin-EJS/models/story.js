const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
    heroImage: String,
    title: String,
    content: String,
    image1: String,
    title1: String,
    content1: String,
    image2: String,
    title2: String,
    content2: String,
    image3: String,
    title3: String,
    content3: String,
    dynamicSections: [{
        name: String,
        post: String,
        content: String,
        image: String
    }],
    journeySections: [{
        title: String,
        content: String,
        image: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('ourStory', storySchema);