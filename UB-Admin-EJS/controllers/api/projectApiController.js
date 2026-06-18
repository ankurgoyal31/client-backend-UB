const Project = require('../../models/Project');

/* =========================
   GET ALL PROJECTS
========================= */
exports.getAll = async (req, res) => {
  try {
    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });

  } catch (err) {
    console.error("Project API GetAll Error:", err);

    res.status(500).json({
      success: false,
      message: "Error Fetching Projects"
    });
  }
};


/* =========================
   GET SINGLE PROJECT BY SLUG
========================= */
exports.getOne = async (req, res) => {
  try {

    const project = await Project.findOne({ slug: req.params.slug })
      .select('-__v');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: project
    });

  } catch (err) {
    console.error("Project API GetOne Error:", err);

    res.status(500).json({
      success: false,
      message: "Error Fetching Project"
    });
  }
};
