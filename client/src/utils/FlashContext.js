import React, { createContext, useReducer, useContext } from "react";

/**
 * Holds temporary flash messages from the server
 * @property {"error" | "success"} type
 */
const FlashContext = createContext({
	message: "",
	type: ""
});
const { Provider } = FlashContext;

const reducer = (state, action) => {
	if (!action) return { flash: { message: null, type: null } };
	else return action.flash;
};

const FlashProvider = ({ value = {}, ...props }) => {
	const [state, dispatch] = useReducer(reducer, {});

	return <Provider value={[state, dispatch]} {...props} />;
};

const useFlashContext = () => {
	return useContext(FlashContext);
};

export { FlashProvider, useFlashContext };
