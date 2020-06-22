import React, { createContext } from "react";
import { Types } from "mongoose";

const UserContext = createContext({
	username: "",
	_id: Types.ObjectId
});
