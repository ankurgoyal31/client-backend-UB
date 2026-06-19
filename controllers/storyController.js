const { render } = require("ejs")
const Story = require("../models/story")

exports.list = async (req, res) => {
    try {
        const stories = await Story.find();
        res.render("ourstory/list", { stories}||{stories:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
} 

exports.addForm = (req,res)=>{
    res.render("ourstory/add")
}

exports.add = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3 } = req.body;
        
        let heroImage = null, image1 = null, image2 = null, image3 = null;
        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) heroImage = "https://client-backend-ub.onrender.com/uploads/"+heroFile.filename;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) image2 ="https://client-backend-ub.onrender.com/uploads/"+ file2.filename;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) image3 ="https://client-backend-ub.onrender.com/uploads/"+ file3.filename;
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
                    if (f) img = "https://client-backend-ub.onrender.com/uploads/"+f.filename;
                }
                dynamicSections.push({
                    name: names[i],
                    post: posts[i] || '',
                    content: contents[i] || '',
                    image: img
                });
            }
        }

        const journeySections = [];
        if (req.body.journeyTitles) {
            const jTitles = Array.isArray(req.body.journeyTitles) ? req.body.journeyTitles : [req.body.journeyTitles];
            const jContents = Array.isArray(req.body.journeyContents) ? req.body.journeyContents : [req.body.journeyContents];

            for (let i = 0; i < jTitles.length; i++) {
                let img = null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `journeyImage_${i}`);
                    if (f) img = "https://client-backend-ub.onrender.com/uploads/"+f.filename;
                }
                journeySections.push({
                    title: jTitles[i],
                    content: jContents[i] || '',
                    image: img
                });
            }
        }

        const newStory = new Story({
            title, 
            content, 
            heroImage,
            title1, content1, image1,
            title2, content2, image2,
            title3, content3, image3,
            dynamicSections,
            journeySections
        });

        await newStory.save();
        res.redirect("/ourstory");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.editForm = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).send("Story not found");
        }
        res.render("ourstory/edit", { story });
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
            if (heroFile) updateData.heroImage ="https://client-backend-ub.onrender.com/uploads/"+ heroFile.filename;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) updateData.image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) updateData.image2 = "https://client-backend-ub.onrender.com/uploads/"+file2.filename;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) updateData.image3 = "https://client-backend-ub.onrender.com/uploads/"+file3.filename;
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
                    if (f) img = "https://client-backend-ub.onrender.com/uploads/"+f.filename;
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

        const journeySections = [];
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
                    if (f) img ="https://client-backend-ub.onrender.com/uploads/"+ f.filename;
                }
                journeySections.push({
                    title: jTitles[i],
                    content: jContents[i] || '',
                    image: img
                });
            }
        }
        
        updateData.journeySections = journeySections;
        await Story.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/ourstory");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.delete =async (req,res)=>{
    try{
        await Story.findByIdAndDelete(req.params.id);
        res.redirect("/ourstory")
    }catch(err){
        console.log("error created",err)
    }
}
