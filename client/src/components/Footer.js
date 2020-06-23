import React, { useState, useEffect } from "react";
/**
 * Autosets to position: fixed or
 */
const Footer = () => {
	const [position, setPosition] = useState("fixed");
	// const useWindowSize = () => {
	// 	const [isWindowScrollable, setScrollable] = useState(Boolean);
	// 	useEffect(() => {
	// 		return () =>
	// 			window.addEventListener("resize", () => {
	// 				console.log("resized!");
	// 				setScrollable(window.innerHeight > document.body.scrollHeight);
	// 				setPosition(isWindowScrollable ? "fixed" : "relative");
	// 			});
	// 	}, [isWindowScrollable]);
	// 	return isWindowScrollable;
	// };
	return (
		<footer
			style={{
				display: "flex",
				position: position,
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
