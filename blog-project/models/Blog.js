const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      trim: true,
      lowercase: true,
      default: "general",
      enum: ["general", "tech", "lifestyle", "education", "travel", "food", "other"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Blog", blogSchema);
