import React from "react";
import "./index.css";

const Container = (props) => {
	return <div className="container wrapper">{props.children}</div>;
};

export default Container;
