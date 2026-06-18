const mongoose = require('mongoose');
const homeSchema = new mongoose.Schema({
    herovideo: String,
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
    title4:String,
    title5:String,
    title6:String,
    title7:String,
    video4:String,
    video5:String,
    video6:String,
    video7:String,
    title8: String,
    content4: String,
content5:String,
content6:String,
content7:String,

title9:String,
title10:String,
title11:String,

title12:String,

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
    }],
AwardSections: [{
        year:String,
        title: String,
        content: String,
     }]

}, { timestamps: true });

module.exports = mongoose.model('home',homeSchema);