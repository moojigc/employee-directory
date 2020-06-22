import { createContext } from "react";
import { Types } from "mongoose";
/**
 * user data from the server
 */
const UserContext = createContext({
	auth: false,
	username: "",
	_id: Types.ObjectId
});

export default UserContext;
