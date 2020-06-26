import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserProvider } from "./utils/UserContext";
import { FlashProvider } from "./utils/FlashContext";
import Employees from "./components/Employees";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Footer from "./components/Footer";
import "materialize-css/dist/js/materialize";
import UserStatus from "./components/UserStatus";

function App() {
	return (
		<Router>
			<UserProvider>
				<UserStatus>
					<FlashProvider>
						<Navbar />
						<Route exact path="/" component={Employees} />
						<Route exact path="/demo" component={Employees} />
						<Route exact path="/employees" component={Employees} />
						<Route exact path="/register" component={Register} />
						<Route exact path="/login" component={Login} />
						<Footer />
					</FlashProvider>
				</UserStatus>
			</UserProvider>
		</Router>
	);
}

export default App;
