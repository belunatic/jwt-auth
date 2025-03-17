require("dotenv").config({ path: "./config/.env" });
const jwt = require("jsonwebtoken");

// Generate JWT
module.exports.generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
};
