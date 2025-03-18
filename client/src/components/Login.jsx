// client/src/components/Login.js
import React, { useState } from "react";
import { UseAuthContext } from "../context/AuthContext";
import axios from "axios";
import "../css/style.css";

const Login = () => {
	const { setLoggedInUser } = UseAuthContext();

	const [formData, setFormData] = useState({
		username: "",
		password: "",
	});
	const [message, setMessage] = useState("");

	const { username, password } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:5000/user/login", {
				username,
				password,
			});
			// to make it simple i have not encrypted the items stored in local storage
			// ensure to use encryption once you get the hang of how all of these things work
			// as we have to protect our localStorage data in case of a breach.
			localStorage.setItem(
				"user",
				JSON.stringify({
					username: res.data.username,
					token: res.data.token,
					email: res.data.email,
				})
			);
			console.log(res);
			setLoggedInUser({ username: res.data.username, email: res.data.email });

			// Set success message
			setMessage("Logged in successfully");
		} catch (err) {
			console.error(err.response.data);
			// Set error message
			setMessage("Failed to login - wrong credentials");
		}
	};

	return (
		<div className="auth-form">
			<h2>Login</h2>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					placeholder="Username"
					name="username"
					value={username}
					onChange={onChange}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					name="password"
					value={password}
					onChange={onChange}
					required
				/>
				<button type="submit">Login</button>
			</form>
			<p className="message">{message}</p>
		</div>
	);
};

export default Login;
