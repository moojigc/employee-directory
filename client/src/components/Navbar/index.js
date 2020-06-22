import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./index.css";

const Navbar = () => {
	const location = useLocation();
	return (
		<nav>
			<div className="nav-wrapper">
				<Link to="/" className="brand-logo">
					<i className="material-icons">people_outline</i>
					Employee Directory
				</Link>
				<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li>
						<Link
							href="/login"
							className={location.pathname === "/login" ? "active" : ""}>
							Login
						</Link>
					</li>
					<li>
						<Link href="/employees">Employees</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
