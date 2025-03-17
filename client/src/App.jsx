// client/src/App.js
import { useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { UseAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

const App = () => {
	const { loggedInUser, handleLogout } = UseAuthContext();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (loggedInUser.username) {
			setLoading(false);
		}
	}, [loggedInUser]);

	return (
		<div className="App">
			{loggedInUser.username ? (
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
