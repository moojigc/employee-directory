import React, { useEffect } from "react";
import Axios from "axios";
import { useUserContext } from "../utils/UserContext";

const UserStatus = ({ children }) => {
	const [_, dispatchUser] = useUserContext();
	useEffect(() => {
		Axios.get("/api/user-status").then((res) => dispatchUser({ user: res.data }));
	}, []);
	return <div>{children}</div>;
};

export default UserStatus;
