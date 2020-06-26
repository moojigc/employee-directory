import React, { createContext, useReducer, useContext } from "react";
import { Types } from "mongoose";
/**
 * user data from the server
 */
const UserContext = createContext({
	_id: Types.ObjectId(),
	username: "",
	company: "",
	auth: false
});
const { Provider } = UserContext;

/**
 * Get and set user state
 * @param {{ id: any, username: string }} user
 * @param {{ type: "register" | "login" | "logout" | "user-status", data: {} }} action
 */
const reducer = (user, action) => {
	return action.user;
};

const UserProvider = ({ value = {}, ...props }) => {
	const [user, dispatch] = useReducer(reducer, {});

	return <Provider value={[user, dispatch]} {...props} />;
};

const useUserContext = () => {
	return useContext(UserContext);
};

export { UserProvider, useUserContext };
