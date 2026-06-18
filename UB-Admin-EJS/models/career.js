const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
 heroImage: String,
    title: String,
    content: String,
    
     content1:String,

     content2:String,

     content3:String,

       title1: String,
    content4: String,

        content5: String,
    content6: String,
    content7: String,
    content8: String,
    content9: String,


    dynamicSections: [{
        name: String,
        post: String,
        experience:String,
        content: String,
        image: String
    }],
    Side_Sections: [{
        title: String,
        content: String,
        image: String
    }]})

module.exports = mongoose.model('career', careerSchema);