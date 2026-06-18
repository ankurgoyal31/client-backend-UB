const { render } = require("ejs")
const value = require("../models/value")

exports.list = async (req, res) => {
    try {
        const values = await value.find();
        res.render("value/list", { values }||{values:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    } 
}
exports.addForm = (req,res)=>{
    res.render("value/add")
}

 
exports.add_data = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3 } = req.body;
        
        let heroImage = null, image1 = null, image2 = null, image3 = null;
        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) heroImage = heroFile.location;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) image1 = file1.location;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) image2 = file2.location;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) image3 = file3.location;
        }

        const dynamicSections = [];
        if (req.body.dynamicNames) {
            const names = Array.isArray(req.body.dynamicNames) ? req.body.dynamicNames : [req.body.dynamicNames];
            const posts = Array.isArray(req.body.dynamicPosts) ? req.body.dynamicPosts : [req.body.dynamicPosts];
            const contents = Array.isArray(req.body.dynamicContents) ? req.body.dynamicContents : [req.body.dynamicContents];

            for (let i = 0; i < names.length; i++) {
                let img = null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `dynamicImage_${i}`);
                    if (f) img = f.location;
                }
                dynamicSections.push({
                    name: names[i],
                    post: posts[i] || '',
                    content: contents[i] || '',
                    image: img
                });
            }
        }

        const Side_Sections = [];
        if (req.body.journeyTitles) {
            const jTitles = Array.isArray(req.body.journeyTitles) ? req.body.journeyTitles : [req.body.journeyTitles];
            const jContents = Array.isArray(req.body.journeyContents) ? req.body.journeyContents : [req.body.journeyContents];

            for (let i = 0; i < jTitles.length; i++) {
                let img = null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `journeyImage_${i}`);
                    if (f) img = f.location;
                }
                Side_Sections.push({
                    title: jTitles[i],
                    content: jContents[i] || '',
                    image: img
                });
            }
        }
        const new_value = new value({
                    title, 
                    content, 
                    heroImage,
                    title1, content1,
                    title2,content2,
                    dynamicSections,
                    Side_Sections
                });
        await new_value.save();
        res.redirect("/value");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.editForm = async (req, res) => {
    try {
        const values = await value.findById(req.params.id);
        if (!values) {
            return res.status(404).send("Value not found");
        }
        res.render("value/edit", { values });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}


exports.edit = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3 } = req.body;
        const updateData = { title, content, title1, content1, title2, content2, title3, content3 };

        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) updateData.heroImage = heroFile.location;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) updateData.image1 = file1.location;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) updateData.image2 = file2.location;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) updateData.image3 = file3.location;
        }

        const dynamicSections = [];
        if (req.body.dynamicNames) {
            const names = Array.isArray(req.body.dynamicNames) ? req.body.dynamicNames : [req.body.dynamicNames];
            const posts = Array.isArray(req.body.dynamicPosts) ? req.body.dynamicPosts : [req.body.dynamicPosts];
            const contents = Array.isArray(req.body.dynamicContents) ? req.body.dynamicContents : [req.body.dynamicContents];
            const existingImages = req.body.existingDynamicImages 
                ? (Array.isArray(req.body.existingDynamicImages) ? req.body.existingDynamicImages : [req.body.existingDynamicImages]) 
                : [];

            for (let i = 0; i < names.length; i++) {
                let img = existingImages[i] || null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `dynamicImage_${i}`);
                    if (f) img = f.location;
                }
                dynamicSections.push({
                    name: names[i],
                    post: posts[i] || '',
                    content: contents[i] || '',
                    image: img
                });
            }
        }
        
        updateData.dynamicSections = dynamicSections;

        const Side_Sections = [];
        if (req.body.journeyTitles) {
            const jTitles = Array.isArray(req.body.journeyTitles) ? req.body.journeyTitles : [req.body.journeyTitles];
            const jContents = Array.isArray(req.body.journeyContents) ? req.body.journeyContents : [req.body.journeyContents];
            const jExistingImages = req.body.existingJourneyImages 
                ? (Array.isArray(req.body.existingJourneyImages) ? req.body.existingJourneyImages : [req.body.existingJourneyImages]) 
                : [];

            for (let i = 0; i < jTitles.length; i++) {
                let img = jExistingImages[i] || null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `journeyImage_${i}`);
                    if (f) img = f.location;
                }
                Side_Sections.push({
                    title: jTitles[i],
                    content: jContents[i] || '',
                    image: img
                });
            }
        }
        
        updateData.Side_Sections = Side_Sections;
        await value.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/value");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}
