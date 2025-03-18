const User = require("../models/User");
const { generateToken } = require("../util/secretToken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

module.exports = {
	// @desc    Register new user
	// @route   POST /users
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
		//send the user id, username, email and a token to the front end
		if (user) {
			res.status(201).json({
				_id: user.id,
				username: user.username,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ msg: "Invalid user data" });
			// throw new Error("Invalid user data");
		}
	}),
	// @desc    Authenticate a user
	// @route   POST /user/login
	// @access  Public
	login: asyncHandler(async (req, res) => {
		const { username, password } = req.body;

		// Check for user username
		const user = await User.findOne({ username });

		if (user && (await bcrypt.compare(password, user.password))) {
			res.json({
				_id: user.id,
				username: user.username,
				email: user.email,
				token: generateToken(user._id),
			});
		} else {
			res.status(400).json({ msg: "Invalid credentials" });
			/* this is an alternative way to (.json({msg:..})) throw an error but it exposes the route to the user in the console
				-- throw new Error("Invalid credentials");
			*/
		}
	}),

	// @desc    Get user data
	// @route   GET /user/ @access  Private
	getUser: asyncHandler(async (req, res) => {
		console.log("This is req.user", req.user);
		res.status(200).json(req.user);
	}),
};
