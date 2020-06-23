import { createContext } from "react";

/**
 * Holds temporary flash messages from the server
 * @property {"error" | "success"} type
 */
const FlashContext = createContext({
	message: "",
	type: ""
});

export default FlashContext;
