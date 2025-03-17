import { createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const UseAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState(null);
	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			// Set the token in the header
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
		}
	}, []);

	return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
