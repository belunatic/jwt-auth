// server/models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, "Please add a name"],
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			unique: [true, "Please add an email"],
		},
		admin: {
			type: Boolean,
			default: false,
		},
		createdAt: {
			type: Date,
			default: new Date(),
		},
	},

	{ timestamps: true /*this will automatic give use a createAt timestamp*/ }
);

module.exports = mongoose.model("User", UserSchema);
