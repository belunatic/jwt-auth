// server/routes/auth.js
const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const AuthController = require("../controllers/authController");
const authController = require("../controllers/authController");

// Register Route
router.post("/register", AuthController.register);

router.post("/login", authController.login);

module.exports = router;
