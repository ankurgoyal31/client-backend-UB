const Blog = require('../models/Blog');
const Project = require('../models/Project');
const Contact = require('../models/Contact');

exports.dashboard = async (req, res) => {
  try {
    // Get Counts
    const blogCount = await Blog.countDocuments();
    const projectCount = await Project.countDocuments();
    const contactCount = await Contact.countDocuments();

    // Render Dashboard
    res.render('dashboard', {
      layout: 'layout',   // dashboard layout with sidebar
      title: 'Dashboard',
      admin: req.session.admin,
      blogCount,
      projectCount,
      contactCount
    });

  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).render('500', {
      layout: 'layout',
      title: 'Server Error',
      error: error.message
    });
  }
};
