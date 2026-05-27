const Blog = require('../models/Blog');

/* =========================
   LIST BLOGS
========================= */
exports.list = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });

    res.render('blogs/list', {
      layout: 'layout',
      title: 'All Blogs',
      admin: req.session.admin,
      blogs
    });

  } catch (error) {
    console.error("Blog List Error:", error);
    res.status(500).render('500', {
      layout: false,
      message: 'Failed to load blogs'
    });
  }
};


/* =========================
   SHOW ADD FORM
========================= */
exports.addForm = (req, res) => {
  res.render('blogs/add', {
    layout: 'layout',
    title: 'Add Blog',
    admin: req.session.admin
  });
};


/* =========================
   CREATE BLOG
========================= */
exports.create = async (req, res) => {
  try {
    await Blog.create({
      title: req.body.title,
      content: req.body.content,
      author: req.session.admin?.name || "Admin"
    });

    res.redirect('/blogs');
 
  } catch (error) {
    console.error("Create Blog Error:", error);
    res.status(500).render('500', {
      layout: false,
      message: 'Failed to create blog'
    });
  }
};


/* =========================
   SHOW EDIT FORM
========================= */
exports.editForm = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.redirect('/blogs');

    res.render('blogs/edit', {
      layout: 'layout',
      title: 'Edit Blog',
      admin: req.session.admin,
      blog
    });

  } catch (error) {
    console.error("Edit Form Error:", error);
    res.redirect('/blogs');
  }
};


/* =========================
   UPDATE BLOG
========================= */
exports.update = async (req, res) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content
    });

    res.redirect('/blogs');

  } catch (error) {
    console.error("Update Blog Error:", error);
    res.redirect('/blogs');
  }
};


/* =========================
   DELETE BLOG
========================= */
exports.delete = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.redirect('/blogs');

  } catch (error) {
    console.error("Delete Blog Error:", error);
    res.redirect('/blogs');
  }
};
