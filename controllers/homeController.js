const { render } = require("ejs")
const home = require("../models/home")

exports.list = async (req, res) => {
    try {
        const home_data = await home.find();
        res.render("home/list", {home_data}||{home_data:[]});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.addForm = (req,res)=>{
    res.render("home/add")
}

exports.add = async (req, res) => {
    try {
        const { title, content, title1, content1, title2, content2, title3, content3,title4,title5,title6,title7,title8,content4,title9,title10,title11,content5,content6,content7,title12,
 } = req.body;
        
let herovideo = null,
    image1 = null,
    image2 = null,
    image3 = null,
    video4 = null,
    video5 = null,
    video6 = null
    video7=null;

if (req.files) {
    const heroFile = req.files.find(f => f.fieldname === "herovideo");
    if (heroFile) herovideo ="https://client-backend-ub.onrender.com/uploads/"+ heroFile.filename;

    const file1 = req.files.find(f => f.fieldname === "image1");
    if (file1) image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;

    const file2 = req.files.find(f => f.fieldname === "image2");
    if (file2) image2 = "https://client-backend-ub.onrender.com/uploads/"+file2.filename;

    const file3 = req.files.find(f => f.fieldname === "image3");
    if (file3) image3 = "https://client-backend-ub.onrender.com/uploads/"+file3.filename;

    const file4 = req.files.find(f => f.fieldname === "video4");
    if (file4) video4 ="https://client-backend-ub.onrender.com/uploads/"+ file4.filename;

    const file5 = req.files.find(f => f.fieldname === "video5");
    if (file5) video5 = "https://client-backend-ub.onrender.com/uploads/"+file5.filename;

    const file6 = req.files.find(f => f.fieldname === "video6");
    if (file6) video6 = "https://client-backend-ub.onrender.com/uploads/"+file6.filename;

    const file7 = req.files.find(f => f.fieldname === "video7");
    if (file7) video7 = "https://client-backend-ub.onrender.com/uploads/"+file7.filename;

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



  const AwardSections = [];
if (req.body.awardTitles) {

    const awardTitles = Array.isArray(req.body.awardTitles)
        ? req.body.awardTitles
        : [req.body.awardTitles];

    const awardYears = Array.isArray(req.body.awardYears)
        ? req.body.awardYears
        : [req.body.awardYears];

    const awardContents = Array.isArray(req.body.awardContents)
        ? req.body.awardContents
        : [req.body.awardContents];

    for (let i = 0; i < awardTitles.length; i++) {

        AwardSections.push({
            year: awardYears[i] || "",
            title: awardTitles[i] || "",
            content: awardContents[i] || ""
        });

    }
}

        const newhome = new home({
            title, 
            content, 
            herovideo,
            title1, content1, image1,
            title2, content2, image2,
            title3, content3, image3,
            title4,title5,title6,title7,title12,
            video4,video5,video6,video7,
            title8,content4,content5,content6,content7,title9,title10,title11,
            dynamicSections,
            journeySections,
            AwardSections
        });

        await newhome.save();
        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.editForm = async (req, res) => {
    try {
        const home_data = await home.findById(req.params.id);
        if (!home) {
            return res.status(404).send("home not found");
        }
        res.render("home/edit", { home_data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.edit = async (req, res) => {
    try {
        const { 
            title, content, 
            title1, content1, 
            title2, content2, 
            title3, content3,
            title4, title5, title6, title7, title8, content4,content5,content6,content7,title9,title10,title11,
        } = req.body;
        
        const existingHome = await home.findById(req.params.id);

        let updateData = { 
            title, content, 
            title1, content1, 
            title2, content2, 
            title3, content3,
            title4, title5, title6, title7, title8, content4, content5,content6,content7,title9,title10,title11,
        };

        if (req.files) {
            const heroFile = req.files.find(f => f.fieldname === 'herovideo');
            if (heroFile) updateData.herovideo = "https://client-backend-ub.onrender.com/uploads/"+ heroFile.filename;
            const file1 = req.files.find(f => f.fieldname === 'image1');
            if (file1) updateData.image1 = "https://client-backend-ub.onrender.com/uploads/"+file1.filename;
            const file2 = req.files.find(f => f.fieldname === 'image2');
            if (file2) updateData.image2 = "https://client-backend-ub.onrender.com/uploads/"+file2.filename;
            const file3 = req.files.find(f => f.fieldname === 'image3');
            if (file3) updateData.image3 ="https://client-backend-ub.onrender.com/uploads/"+ file3.filename;
            const file4 = req.files.find(f => f.fieldname === 'video4');
            if (file4) updateData.video4 = "https://client-backend-ub.onrender.com/uploads/"+file4.filename;
            const file5 = req.files.find(f => f.fieldname === 'video5');
            if (file5) updateData.video5 = "https://client-backend-ub.onrender.com/uploads/"+file5.filename;
            const file6 = req.files.find(f => f.fieldname === 'video6');
            if (file6) updateData.video6 ="https://client-backend-ub.onrender.com/uploads/"+ file6.filename;
            const file7 = req.files.find(f => f.fieldname === 'video7');
            if (file7) updateData.video7 = "https://client-backend-ub.onrender.com/uploads/"+file7.filename;
        }

        const dynamicSections = [];
        if (req.body.dynamicNames) {
            const names = Array.isArray(req.body.dynamicNames) ? req.body.dynamicNames : [req.body.dynamicNames];
            const posts = Array.isArray(req.body.dynamicPosts) ? req.body.dynamicPosts : [req.body.dynamicPosts];
            const contents = Array.isArray(req.body.dynamicContents) ? req.body.dynamicContents : [req.body.dynamicContents];

            for (let i = 0; i < names.length; i++) {
                let img = existingHome.dynamicSections && existingHome.dynamicSections[i] ? existingHome.dynamicSections[i].image : null;
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
            updateData.dynamicSections = dynamicSections;
        } else {
            updateData.dynamicSections = [];
        }

        const journeySections = [];
        if (req.body.journeyTitles) {
            const jTitles = Array.isArray(req.body.journeyTitles) ? req.body.journeyTitles : [req.body.journeyTitles];
            const jContents = Array.isArray(req.body.journeyContents) ? req.body.journeyContents : [req.body.journeyContents];

            for (let i = 0; i < jTitles.length; i++) {
                let img = existingHome.journeySections && existingHome.journeySections[i] ? existingHome.journeySections[i].image : null;
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
            updateData.journeySections = journeySections;
        } else {
            updateData.journeySections = [];
        }
        
        const AwardSections = [];
        if (req.body.awardTitles) {
            const awardTitles = Array.isArray(req.body.awardTitles) ? req.body.awardTitles : [req.body.awardTitles];
            const awardYears = Array.isArray(req.body.awardYears) ? req.body.awardYears : [req.body.awardYears];
            const awardContents = Array.isArray(req.body.awardContents) ? req.body.awardContents : [req.body.awardContents];

            for (let i = 0; i < awardTitles.length; i++) {
                AwardSections.push({
                    year: awardYears[i] || "",
                    title: awardTitles[i] || "",
                    content: awardContents[i] || ""
                });
            }
            updateData.AwardSections = AwardSections;
        } else {
            updateData.AwardSections = [];
        }

        await home.findByIdAndUpdate(req.params.id, updateData);
        res.redirect("/home");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
}

exports.delete =async (req,res)=>{
    try{
        await home.findByIdAndDelete(req.params.id);
        res.redirect("/home")
    }catch(err){
        console.log("error created",err)
    }
}
