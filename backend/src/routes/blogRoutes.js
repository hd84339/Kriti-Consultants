const express = require("express");
const router = express.Router();

const {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  seedBlogs,
} = require("../controllers/blogController");

const { protect } = require("../middleware/authMiddleware");

// Public routes
router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

// Protected Admin Routes
router.post("/", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.post("/seed", protect, seedBlogs);

module.exports = router;
