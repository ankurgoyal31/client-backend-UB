const mongoose  = require("mongoose")

const valueSchema = mongoose.Schema({
    heroImage: String,
    title: String,
    content: String,
    
    title1:String,
    content1:String,
    title2:String,
    content2:String,
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

module.exports = mongoose.model('value', valueSchema);