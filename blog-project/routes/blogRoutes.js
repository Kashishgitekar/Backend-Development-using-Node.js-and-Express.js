const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog,
} = require("../controllers/blogController");

// POST   /api/blogs      -> Create a new blog (protected: author = logged-in user)
router.post("/", auth, createBlog);

// GET    /api/blogs      -> Fetch all blogs
router.get("/", getBlogs);

// GET    /api/blogs/:id  -> Fetch a single blog
router.get("/:id", getBlog);

// PUT    /api/blogs/:id  -> Update a blog (protected)
router.put("/:id", auth, updateBlog);

// DELETE /api/blogs/:id  -> Delete a blog (protected)
router.delete("/:id", auth, deleteBlog);

module.exports = router;
