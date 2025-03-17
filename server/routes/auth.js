// server/routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { ensureAuth } = require("../middleware/authMiddleware");

// Register Route
router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/", ensureAuth, authController.getUser);

module.exports = router;
