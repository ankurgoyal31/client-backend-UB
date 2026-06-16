const mongoose = require('mongoose');

const impactSchema = new mongoose.Schema({
heroImage: String,
    title: String,
    content: String,
    
    title1:String,
    content1:String,
    image1:String,
    
    title2:String,
    content2:String,
    image2:String,


    title3:String,
    content3:String,
    image3:String,

    title4:String,
    content4:String,
    image4:String,

    title5:String,
    content5:String,
    image5:String,

    title6:String,
    content6:String,
    
    title7:String,
    content7:String,
    content8:String,
    content9:String,
    content10:String,

    image6:String,

    dynamicSections: [{
        name: String,
        post: String,
        content: String,
        image: String
    }],
    Side_Sections: [{
        title: String,
        content: String,
        image: String
    }]
})

module.exports = mongoose.model('impact', impactSchema);