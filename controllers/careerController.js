const { render } = require("ejs");
const career = require("../models/career");

exports.list = async (req, res) => {
    try {
        const career_data = await career.find();
        res.render("career/list", {career_data}||{career_data:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.addForm = (req,res)=>{
    res.render("career/add");
}

exports.add_data = async (req, res) => {
    try {
        console.log(req.files);
console.log(JSON.stringify(req.files, null, 2));
        const { title, content, title1, content1, title2, content2, title3, content3,title4, content4,content5,content6,content7,content8,content9 } = req.body;
        
        let heroImage = null, image1 = null, image2 = null, image3 = null;
        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) heroImage = "https://client-backend-ub.onrender.com/uploads/"+heroFile.filename;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) image2 = "https://client-backend-ub.onrender.com/uploads/"+file2.filename;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) image3 = "https://client-backend-ub.onrender.com/uploads/"+file3.filename;
        }

        const dynamicSections = [];
        if (req.body.dynamicNames) {
            const names = Array.isArray(req.body.dynamicNames) ? req.body.dynamicNames : [req.body.dynamicNames];
            const posts = Array.isArray(req.body.dynamicPosts) ? req.body.dynamicPosts : [req.body.dynamicPosts];
            const contents = Array.isArray(req.body.dynamicContents) ? req.body.dynamicContents : [req.body.dynamicContents];
            const experience = Array.isArray(req.body.dynamicExperience) ? req.body.dynamicExperience : [req.body.dynamicExperience];
            for (let i = 0; i < names.length; i++) {
                let img = null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `dynamicImage_${i}`);
                    if (f) img = "https://client-backend-ub.onrender.com/uploads/"+f.filename;
                }
                dynamicSections.push({
                    name: names[i],
                    post: posts[i] || '',
                    experience:experience[i]||'',
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
        const new_career = new career({
                    title, 
                    content, 
                    heroImage,
                     content1,
                    content2,
                    content3,
                    content4,
                    title1,content4,
                    content5,content6,content7,content8,content9,

                    dynamicSections,
                    Side_Sections
                });
        await new_career.save();
        res.redirect("/career");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.editForm = async (req, res) => {
    try {
        const story = await career.findById(req.params.id);
        res.render("career/edit", { story });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.edit_data = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3, title4, content4, content5, content6, content7, content8, content9 } = req.body;
        
        const existingCareer = await career.findById(req.params.id);
        
        let heroImage = existingCareer.heroImage;

        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'heroImage');
            if (heroFile) heroImage ="https://client-backend-ub.onrender.com/uploads/"+ heroFile.filename;
        }

        const dynamicSections = [];
        if (req.body.dynamicNames) {
            const names = Array.isArray(req.body.dynamicNames) ? req.body.dynamicNames : [req.body.dynamicNames];
            const posts = Array.isArray(req.body.dynamicPosts) ? req.body.dynamicPosts : [req.body.dynamicPosts];
            const contents = Array.isArray(req.body.dynamicContents) ? req.body.dynamicContents : [req.body.dynamicContents];
            const experience = Array.isArray(req.body.dynamicExperience) ? req.body.dynamicExperience : [req.body.dynamicExperience];
            for (let i = 0; i < names.length; i++) {
                let img = existingCareer.dynamicSections && existingCareer.dynamicSections[i] ? existingCareer.dynamicSections[i].image : null;
                if (req.files) {
                    const f = req.files.find(f => f.fieldname === `dynamicImage_${i}`);
                    if (f) img ="https://client-backend-ub.onrender.com/uploads/"+ f.filename;
                }
                dynamicSections.push({
                    name: names[i],
                    post: posts[i] || '',
                    experience: experience[i] || '',
                    content: contents[i] || '',
                    image: img
                }); 
            }
            existingCareer.dynamicSections = dynamicSections;
        } else {
            // If they removed all sections
            existingCareer.dynamicSections = [];
        }

        const Side_Sections = [];
        if (req.body.journeyTitles) {
            const jTitles = Array.isArray(req.body.journeyTitles) ? req.body.journeyTitles : [req.body.journeyTitles];
            const jContents = Array.isArray(req.body.journeyContents) ? req.body.journeyContents : [req.body.journeyContents];

            for (let i = 0; i < jTitles.length; i++) {
                let img = existingCareer.Side_Sections && existingCareer.Side_Sections[i] ? existingCareer.Side_Sections[i].image : null;
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
            existingCareer.Side_Sections = Side_Sections;
        } else {
            // If they removed all sections
            existingCareer.Side_Sections = [];
        }

        existingCareer.title = title;
        existingCareer.content = content;
        existingCareer.heroImage = heroImage;
        existingCareer.content1 = content1;
        existingCareer.content2 = content2;
        existingCareer.content3 = content3;
        existingCareer.content4 = content4;
        existingCareer.title1 = title1;
        existingCareer.content5 = content5;
        existingCareer.content6 = content6;
        existingCareer.content7 = content7;
        existingCareer.content8 = content8;
        existingCareer.content9 = content9;

        await existingCareer.save();
        res.redirect("/career");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};

exports.delete_data = async (req, res) => {
    try {
        await career.findByIdAndDelete(req.params.id);
        res.redirect("/career");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
