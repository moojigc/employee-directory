import React from "react";
import "./index.css";

/**
 *
 * @param {Object} props
 * @param {"success" | "error"} props.type
 */
const Alert = (props) => {
	return <div className={`alert alert-${props.type}`}>{props.children}</div>;
};

export default Alert;
