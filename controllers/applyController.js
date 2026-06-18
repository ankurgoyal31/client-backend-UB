const { render } = require("ejs")
const apply = require("../models/apply")

exports.list = async (req, res) => {
    try {
        const applied = await apply.find();
        res.render("apply/list", { applied}||{applied:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}