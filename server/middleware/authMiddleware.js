const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const ensureAuth = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// Get user from the token
			//in generateToken an id was sent as a payload
			//now we can use the user id to get info from the database or add it to the request
			//select('-password') is to exclude the password from being sent back to the front end
			req.user = await User.findById(decoded.id).select("-password");
			console.log("user is authenticated");

			next();
		} catch (error) {
			console.log(error);
			res.status(401);
			throw new Error("Not authorized");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

module.exports = { ensureAuth };
