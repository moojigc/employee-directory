import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../utils/UserContext";
import "./index.css";
import axios from "axios";

const Navbar = ({ setFlash, setUser }) => {
	const user = useContext(UserContext);
	const location = useLocation();
	const handleLogout = async () => {
		let { data } = await axios.get("/api/logout", { withCredentials: true });
		setFlash(data.flash);
		setUser({ username: "Guest", _id: null, auth: false });
	};
	return (
		<nav>
			<div className="nav-wrapper">
				<Link
					to="/"
					id="logo-desktop"
					className="brand-logo left"
					style={{ marginLeft: "1rem" }}>
					Employee Directory
					<i className="material-icons">people_outline</i>
				</Link>
				<Link
					to="/"
					id="logo-mobile"
					className="brand-logo left"
					style={{ marginLeft: "1rem" }}>
					<i className="material-icons">people_outline</i>
				</Link>
				<ul id="nav-mobile" className="right">
					<li className={location.pathname === "/login" ? "active" : ""}>
						{user.auth ? (
							<Link to="/login" onClick={handleLogout}>
								Logout
							</Link>
						) : null}
					</li>
					{user.auth ? null : (
						<li className={location.pathname === "/register" ? "active" : ""}>
							<Link to="/register">Register</Link>
						</li>
					)}
					{user.auth ? (
						<li className={location.pathname === "/employees" ? "active" : ""}>
							<Link to="/employees">Employees</Link>
						</li>
					) : null}
					{user.auth ? null : (
						<li className={location.pathname === "/demo" ? "active" : ""}>
							<Link to="/demo">Demo</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
