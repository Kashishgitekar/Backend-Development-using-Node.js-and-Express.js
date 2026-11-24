const Blog = require("../models/Blog");
const mongoose = require("mongoose");

// ------------------- POST /api/blogs -------------------
// Create a new blog post (associated with the logged-in author)
exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    // req.user is set by the auth middleware after verifying the JWT
    const blog = await Blog.create({
      title,
      content,
      author: req.user.id,
    });

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ------------------- GET /api/blogs -------------------
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json({ message: "All blogs", count: blogs.length, blogs });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ------------------- GET /api/blogs/:id -------------------
exports.getBlog = async (req, res) => {
  try {
    // Guard against malformed ids so they return 400/404 instead of a 500
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email",
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ blog });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ------------------- PUT /api/blogs/:id -------------------
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { _id: req.params.id, author: req.user.id }, // only the author can update
      { title: req.body.title, content: req.body.content },
      { new: true, runValidators: true },
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found or not yours" });
    }

    res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ------------------- DELETE /api/blogs/:id -------------------
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found or not yours" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
