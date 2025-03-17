import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

//an anonymous function that return the context
export const UseAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState({});

	//check to see if Token still valid
	useEffect(() => {
		const userData = localStorage.getItem("user");
		//if not data found in local storage
		if (!userData) {
			console.log("User not logged in");
			return;
		}
		const verifyToken = async () => {
			// Parse the JSON string back into a JavaScript object
			const user = JSON.parse(userData);
			// Set the token in the header
			axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;

			try {
				const res = await axios.get("http://localhost:5000/user/");
				console.log("Token is valid here is the data", res);
				setLoggedInUser({
					username: res.data.username,
					email: res.data.email,
					id: res.data._id,
				});
			} catch (err) {
				console.error("Token might have expired", err);
			}
		};

		verifyToken();
	}, []);

	//logout function
	const handleLogout = () => {
		localStorage.removeItem("user"); // Remove token from localStorage
		setLoggedInUser(null); // Set logged-in user to null
	};

	return (
		<AuthContext.Provider
			value={{ loggedInUser, setLoggedInUser, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
