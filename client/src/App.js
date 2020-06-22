import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees";
import Wrapper from "./components/Wrapper";
import Navbar from "./components/Navbar";
import "materialize-css/dist/css/materialize.min.css";

function App() {
	return (
		<Router>
			<Wrapper>
				<Navbar />
				<Route exact path="/" component={Employees} />
				{/* <Route exact path="/login" component={Login} /> */}
			</Wrapper>
		</Router>
	);
}

export default App;
