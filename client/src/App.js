import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserContext from "./utils/UserContext";
import "./App.css";
import Employees from "./components/Employees";
import FlashContext from "./utils/FlashContext";
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import axios from "axios";

function App() {
	const [user, setUser] = useState({});
	const [flash, setFlash] = useState("");

	useEffect(() => {
		axios.get("/api/user-status", { withCredentials: true }).then(({ data }) => {
			setUser(data);
		});
	}, []);
	return (
		<Router>
			<UserContext.Provider value={user}>
				<FlashContext.Provider value={flash}>
					<Navbar setFlash={setFlash} setUser={setUser} />
					<Route exact path="/" component={Employees} />
					<Route exact path="/employees" component={Employees} />
					<Route exact path="/register" component={Register} />
					<Route
						exact
						path="/login"
						component={() => (
							<Login flash={flash} setFlash={setFlash} setUser={setUser} />
						)}
					/>
				</FlashContext.Provider>
			</UserContext.Provider>
		</Router>
	);
}

export default App;
