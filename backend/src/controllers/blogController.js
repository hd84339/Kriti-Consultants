const Blog = require("../models/Blog");

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = async (req, res) => {
  try {
    // Generate slug from title if not provided
    if (!req.body.slug && req.body.title) {
      req.body.slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    const blog = await Blog.create(req.body);
    res.status(201).json({ success: true, blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: "A blog with this slug already exists." });
    }
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// @desc    Seed blogs from frontend
// @route   POST /api/blogs/seed
// @access  Private/Admin
const seedBlogs = async (req, res) => {
  try {
    const blogsToSeed = req.body.blogs;
    
    if (!blogsToSeed || !Array.isArray(blogsToSeed)) {
      return res.status(400).json({ success: false, message: "No valid blogs array provided" });
    }

    // Delete existing to avoid duplicates during seed
    await Blog.deleteMany({});
    
    const createdBlogs = await Blog.insertMany(blogsToSeed);
    
    res.status(201).json({ success: true, count: createdBlogs.length, message: "Database seeded successfully" });
  } catch (error) {
    console.error("Error seeding blogs:", error);
    res.status(500).json({ success: false, message: "Server Error during seeding" });
  }
};

module.exports = {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  seedBlogs,
};
