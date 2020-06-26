import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
const Footer = () => {
	const location = useLocation();
	const [isDocScrollable, setScrollable] = useState(false);
	const footerPosition = isDocScrollable ? "unset" : "fixed";
	useEffect(() => {
		setScrollable(document.body.scrollHeight > window.innerHeight);
	}, [location.pathname]);
	return (
		<footer
			style={{
				display: "flex",
				bottom: 0,
				position: footerPosition,
				background: "var(--primary)",
				color: "whitesmoke",
				width: "100%",
				padding: "0.5rem",
				justifyContent: "center",
				marginTop: "2rem"
			}}>
			Developed by &nbsp;<a href="https://www.github.com/moojigc">Moojig Battsogt</a>
		</footer>
	);
};

export default Footer;
