const media = require('../models/media');

exports.add = async (req, res) => {
    try {
        const mediaItems = await media.find().sort({ createdAt: -1 });
        res.render('media/list', {layout: 'layout',title: 'Add Media',admin: req.session.admin,mediaItems});
    } catch (error) {
        console.error("Media Add Form Error:", error);
        res.status(500).render('500', {layout: 'layout',title: 'Server Error',error: error.message});
    }
};

exports.addForm = (req, res) => {
    res.render('media/add', {layout: 'layout',title: 'Add Media',admin: req.session.admin});
};

exports.create = async (req, res) => {
    try {
        console.log("Create Media Request Body:", req.body);
        console.log("Create Media Files:", req.files);
        const mediaUrl =req.files && req.files.mediaFile? "/uploads/"+req.files.mediaFile[0].filename: null;
        await media.create({ category: req.body.category,title: req.body.title, description: req.body.description, url: mediaUrl });
        res.redirect('/media/list');
    } catch (error) {

        console.error("Create Media Error:", error);

        res.status(500).render('500', {
            layout: 'layout',
            title: 'Server Error',
            error: error.message
        });
    }
};

exports.list = async (req, res) => {
    try {
        const mediaItems = await media.find().sort({ createdAt: -1 });
        res.render('media/list',{layout: 'layout',title: 'Media List',admin: req.session.admin,mediaItems});
    } catch (error) {
        console.error("Media List Error:", error);
        res.status(500).render('500', {layout: 'layout',title: 'Server Error',error: error.message});
    }
};

exports.edit = async (req, res) => {
    try {
        const mediaItem = await media.findById(req.params.id);
        if (!mediaItem) {
            return res.status(404).render('404', { layout: 'layout', title: 'Not Found' });
        }
        res.render('media/edit', { layout: 'layout', title: 'Edit Media', admin: req.session.admin, mediaItem });
    } catch (error) {
        console.error("Media Edit Form Error:", error);
        res.status(500).render('500', { layout: 'layout', title: 'Server Error', error: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const updateData = {
            category: req.body.category,
            title: req.body.title,
            description: req.body.description
        };
        
        if (req.files && req.files.mediaFile) {
            updateData.url = "/uploads/"+req.files.mediaFile[0].filename;
        }
        await media.findByIdAndUpdate(req.params.id, updateData);
        res.redirect('/media/list');
    } catch (error) {
        console.error("Media Update Error:", error);
        res.status(500).render('500', { layout: 'layout', title: 'Server Error', error: error.message });
    }
};

exports.delete = async (req, res) => {
    try {
        await media.findByIdAndDelete(req.params.id);
        res.redirect('/media/list');
    } catch (error) {
        console.error("Media Delete Error:", error);
        res.status(500).render('500', { layout: 'layout', title: 'Server Error', error: error.message });
    }
};
