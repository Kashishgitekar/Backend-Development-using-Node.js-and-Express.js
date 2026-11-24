require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// ----------------- Middleware -----------------
app.use(cors());
app.use(express.json());

// ----------------- Routes -----------------
app.get("/", (req, res) => {
    res.send("Backend server is running!");
});

app.use("/api", userRoutes);
app.use("/api/blogs", blogRoutes);

// ----------------- Connect DB & Start Server -----------------
const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed:", err.message);
        // Start the server anyway so basic routes still work for testing
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} (without database)`);
        });
    });
