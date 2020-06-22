import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees";
import Navbar from "./components/Navbar";
import "materialize-css/dist/css/materialize.css";
import "materialize-css/dist/js/materialize";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
	return (
		<Router>
			<div>
				<Navbar />
				<Route exact path="/" component={Employees} />
				<Route exact path="/employees" component={Employees} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
			</div>
		</Router>
	);
}

export default App;
