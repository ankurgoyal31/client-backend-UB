const Blog = require('../../models/Blog');

/* =========================
   GET ALL BLOGS
========================= */
exports.getAll = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .sort({ createdAt: -1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });

  } catch (err) {
    console.error("API GetAll Error:", err);

    res.status(500).json({
      success: false,
      message: "Error Fetching Blogs"
    });
  }
};


/* =========================
   GET SINGLE BLOG
========================= */
exports.getOne = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .select('-__v');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog Not Found"
      });
    }

    res.status(200).json({
      success: true,
      data: blog
    });

  } catch (err) {
    console.error("API GetOne Error:", err);

    res.status(500).json({
      success: false,
      message: "Invalid Blog ID"
    });
  }
};
