import React from "react";
const Footer = () => {
	return (
		<footer
			style={{
				display: "flex",
				zIndex: -1,
				position: "fixed",
				bottom: 0,
				background: "var(--primary)",
				color: "whitesmoke",
				width: "100%",
				padding: "0.5rem",
				justifyContent: "center"
			}}>
			Developed by &nbsp;<a href="https://www.github.com/moojigc">Moojig Battsogt</a>
		</footer>
	);
};

export default Footer;
