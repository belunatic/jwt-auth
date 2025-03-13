// server/routes/auth.js
const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
const AuthController = require("../controllers/authController");

// Register Route
router.post("/register", AuthController.register);

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		// Check if the user exists
		let user = await User.findOne({ username });
		if (!user) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		// Validate password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ msg: "Invalid credentials" });
		}

		// Generate JWT token
		const payload = {
			user: {
				id: user.id,
				name: user.username,
			},
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: "30 days" },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
