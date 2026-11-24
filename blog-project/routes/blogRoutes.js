const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createBlog,
  getBlogs,
  getBlog,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

// POST   /api/blogs      -> Create a new blog (protected: author = logged-in user)
router.post("/", auth, createBlog);

// GET    /api/blogs      -> Fetch all blogs (optional ?search= & ?category= filters)
router.get("/", getBlogs);

// GET    /api/blogs/my   -> Fetch the logged-in user's blogs (protected)
router.get("/my", auth, getMyBlogs);

// GET    /api/blogs/:id  -> Fetch a single blog
router.get("/:id", getBlog);

// PUT    /api/blogs/:id  -> Update a blog (protected)
router.put("/:id", auth, updateBlog);

// DELETE /api/blogs/:id  -> Delete a blog (protected)
router.delete("/:id", auth, deleteBlog);

module.exports = router;
