// server/routes/auth.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register Route
router.post("/register", async (req, res) => {
	const { username, email, password } = req.body;

	try {
		// let user = await User.findOne({ username });
		let user = await User.findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (!user || !email || !password) {
			return res.status(400).json({ msg: "Please add all fields" });
		}
		if (user) {
			//check to see if username or email exist
			return user.username === username
				? res.status(400).json({ msg: "User already exists" })
				: res.status(400).json({ msg: "Email already exists" });
		}

		user = new User({ username, email, password });

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		await user.save();
		//console.log out user!
		console.log(user, " is saved");

		const payload = {
			user: { id: user.id },
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: 3600 },
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
