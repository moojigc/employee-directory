import React from "react";

const Container = ({ width, ...props }) => {
	return (
		<div style={width ? { width: width } : {}} className="container wrapper">
			{props.children}
		</div>
	);
};

export default Container;
