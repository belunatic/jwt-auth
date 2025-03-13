const User = require("../models/User");
const { createSecretToken } = require("../util/SecretToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

module.exports = {
	// @desc    Register new user
	// @route   POST /api/users
	// @access  Public
	register: asyncHandler(async (req, res) => {
		const { username, email, password } = req.body;

		if (!username || !email || !password) {
			res.status(400).json({ msg: "Please add all fields" });
		}

		// Check if user exists
		const userExists = await User.findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (userExists) {
			//check to see if username or email exist
			return userExists.username === username
				? res.status(400).json({ msg: "User already exists" })
				: res.status(400).json({ msg: "Email already exists" });
		}
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create user
		const user = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		//if user is created
		if (user) {
			res.status(201).json({
				_id: user.id,
				username: user.username,
				email: user.email,
				token: createSecretToken(user._id),
			});
		} else {
			res.status(400).json({ msg: "Invalid user data" });
			// throw new Error("Invalid user data");
		}
	}),
	// @desc    Authenticate a user
	// @route   POST /api/users/login
	// @access  Public
	login: asyncHandler(async (req, res) => {
		const { username, password } = req.body;

		// Check for user email
		const user = await User.findOne({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({
				_id: user.id,
				username: user.username,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400);
			throw new Error("Invalid credentials");
		}
	}),
};
