const mongoose = require("mongoose");
const popupSchema = new mongoose.Schema({
    image :String,
    title:String,
    type:String,
    location:String
})



module.exports = mongoose.model('popup', popupSchema);