const { render } = require("ejs")
const impact = require("../models/impact")

exports.list = async (req, res) => {
    try {
        const impact_data = await impact.find();
        res.render("impact/list", { impact_data }||{values:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    } 
}

exports.addForm = (req,res)=>{
    res.render("impact/add")
}

exports.add_data = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3,title4, content4,title5, content5,title6, content6,title7,content7,content8,content9,content10 } = req.body;
        
        let heroImage = null, image1 = null, image2 = null, image3 = null,image4 = null,image5 = null,image6 = null;
        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) heroImage ="https://client-backend-ub.onrender.com/uploads/"+ heroFile.filename;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) image2 = "https://client-backend-ub.onrender.com/uploads/"+file2.filename;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) image3 = "https://client-backend-ub.onrender.com/uploads/"+file3.filename;

             const file4 = req.files.find(f => f.fieldname === 'image4');
            if (file4) image4 = "https://client-backend-ub.onrender.com/uploads/"+file4.filename;
             const file5 = req.files.find(f => f.fieldname === 'image5');
            if (file5) image5 = "https://client-backend-ub.onrender.com/uploads/"+file5.filename;

            const file6 = req.files.find(f => f.fieldname === 'image6');
            if (file6) image6 ="https://client-backend-ub.onrender.com/uploads/"+ file6.filename;
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

        const Side_Sections = [];
        if (req.body.journeyTitles) {
            const jTitles = Array.isArray(req.body.journeyTitles) ? req.body.journeyTitles : [req.body.journeyTitles];
            const jContents = Array.isArray(req.body.journeyContents) ? req.body.journeyContents : [req.body.journeyContents];

            for (let i = 0; i < jTitles.length; i++) {
                let img = null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `journeyImage_${i}`);
                    if (f) img ="https://client-backend-ub.onrender.com/uploads/"+ f.filename;
                }
                Side_Sections.push({
                    title: jTitles[i],
                    content: jContents[i] || '',
                    image: img
                });
            }
        }

        const new_impact = new impact({
                    title, 
                    content, 
                    heroImage,
                    title1, content1,image1,
                    title2,content2,image2,
                    title3, content3,image3,
                    title4, content4,image4,
                    title5, content5,image5,
                    title6, content6,
                    title7,content7,content8,content9,content10,image6,
                    dynamicSections,
                    Side_Sections
                });

        await new_impact.save();
        res.redirect("/impact");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.editForm = async (req, res) => {
    try {
        const impact_data = await impact.findById(req.params.id);
        if (!impact_data) {
            return res.status(404).send("Impact data not found");
        }
        res.render("impact/edit", { impact_data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.edit = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3, title4, content4, title5, content5, title6, content6, title7, content7, content8, content9, content10 } = req.body;
        const updateData = { title, content, title1, content1, title2, content2, title3, content3, title4, content4, title5, content5, title6, content6, title7, content7, content8, content9, content10 };

        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) updateData.heroImage = "https://client-backend-ub.onrender.com/uploads/"+heroFile.filename;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) updateData.image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) updateData.image2 = "https://client-backend-ub.onrender.com/uploads/"+file2.filename;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) updateData.image3 = "https://client-backend-ub.onrender.com/uploads/"+file3.filename;
            const file4 = req.files.find(f => f.fieldname === 'image4');
            if (file4) updateData.image4 = "https://client-backend-ub.onrender.com/uploads/"+file4.filename;
            const file5 = req.files.find(f => f.fieldname === 'image5');
            if (file5) updateData.image5 = "https://client-backend-ub.onrender.com/uploads/"+file5.filename;
            const file6 = req.files.find(f => f.fieldname === 'image6');
            if (file6) updateData.image6 = "https://client-backend-ub.onrender.com/uploads/"+file6.filename;
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
                    if (f) img ="https://client-backend-ub.onrender.com/uploads/"+ f.filename;
                }
                dynamicSections.push({
                    name: names[i],
                    post: posts[i] || '',
                    content: contents[i] || '',
                    image: img
                });
            }
        }
        if (req.body.dynamicNames) {
            updateData.dynamicSections = dynamicSections;
        }

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
                    if (f) img ="https://client-backend-ub.onrender.com/uploads/"+ f.filename;
                }
                Side_Sections.push({
                    title: jTitles[i],
                    content: jContents[i] || '',
                    image: img
                });
            }
        }
        updateData.Side_Sections = Side_Sections;

        await impact.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/impact");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.delete = async (req, res) => {
    try {
        await impact.findByIdAndDelete(req.params.id);
        res.redirect("/impact");
    } catch (err) {
        console.log("error deleted", err);
        res.status(500).send("Server Error");
    }
}
