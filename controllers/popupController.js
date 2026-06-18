const { render } = require("ejs")
const popup = require("../models/popup");
const { castObject } = require("../models/Admin");

exports.addForm = async (req, res) => {
    try {
        const popup_data = await popup.find();
        res.render("popup/add", {popup_data}||{popup_data:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.add =async(req,res)=>{
    try{
        const { title,type,location} = req.body;
    let image = null;

if (req.files) {
    const File = req.files.find(f => f.fieldname === "image");
    if (File) image ="/uploads/"+ File.filename;
}
const newpopup = new popup({ title,  type,   image, location });
        await newpopup.save();
          res.redirect("/dashboard")

    }catch(err){
        console.log(err)
        res.status(500).send("Server Error");
    }
}

exports.editform = async(req,res)=>{
    try{
        let popup_data = await popup.findOne({});
        res.render("popup/edit", { popup_data });
     }catch(err){
        console.log(err);
        res.status(500).send("Server Error");
    }
} 

exports.edit = async (req, res) => {
    try {

        const { title, type,location } = req.body;

        let updateData = {
            title,
            type,location,
        };

        if (req.files && req.files.length > 0) {
            const File = req.files.find(f => f.fieldname === "image");

            if (File) {
                updateData.image ="/uploads/"+ File.filename;
            }
        }

        await popup.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        res.redirect("/dashboard");

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};
