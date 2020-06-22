import React from "react";

const Main = (props) => {
	return (
		<main style={{ padding: props.padding ? props.padding : "0 2rem" }}>{props.children}</main>
	);
};

export default Main;
