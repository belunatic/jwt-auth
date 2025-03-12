const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/auth");
const connectDB = require("./config/database");

require("dotenv").config({ path: "./config/.env" });

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/auth", authRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("let get this party started 🐯");
});
