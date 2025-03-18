// client/src/App.js
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { UseAuthContext } from "./context/AuthContext";

const App = () => {
	const { loggedInUser, handleLogout } = UseAuthContext();

	return (
		<div className="App">
			{loggedInUser?.username ? (
				<div>
					<p>Welcome {loggedInUser.username}</p>
					<button onClick={handleLogout}>Logout</button>
				</div>
			) : (
				<div>
					<Register />
					<Login />
				</div>
			)}
		</div>
	);
};

export default App;
