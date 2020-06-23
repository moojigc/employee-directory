import React from "react";
import "./index.css";

const Main = (props) => {
	const padding = () => {
		if (window.innerWidth <= 992) {
			return "1rem";
		} else if (window.innerHeight > 992 && props.padding) {
			return props.padding;
		} else {
			return "0 2rem";
		}
	};
	return <main style={{ padding: padding() }}>{props.children}</main>;
};

export default Main;
