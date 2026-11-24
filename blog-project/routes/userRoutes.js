const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

// POST /api/register  -> Register a new user
router.post("/register", register);

// POST /api/login     -> Verify user credentials
router.post("/login", login);

module.exports = router;
