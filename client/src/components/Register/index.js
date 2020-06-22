import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "../Container";
import "./index.css";
import axios from "axios";
import Header from "../Header";

const Register = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [email, setEmail] = useState("");
	const history = useHistory();

	const handleRegister = async (event) => {
		event.preventDefault();
		let response = await axios.post("/api/register", {
			username: username,
			password: password,
			password2: password2,
			email: email
		});
		if (response.status === 200) {
			history.push("/login");
		} else {
			console.log(response.data.message);
		}
	};
	return (
		<Container>
			<Header>Register</Header>
			<form className="col s12">
				<div className="row">
					<div className="input-field col s12">
						<i className="material-icons prefix">email</i>
						<label htmlFor="email">Email</label>
						<input
							onChange={({ target }) => setEmail(target.value)}
							name="email"
							type="email"
							className="validate"
							required
						/>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s12">
						<i className="material-icons prefix">account_circle</i>
						<input
							onChange={({ target }) => setUsername(target.value)}
							name="username"
							type="text"
							className="validate"
							required
						/>
						<label htmlFor="email">Username</label>
					</div>
				</div>
				<div className="row">
					<div className="input-field col s6">
						<i className="material-icons prefix">vpn_key</i>
						<input
							onChange={({ target }) => setPassword(target.value)}
							name="password"
							type="password"
							className="validate"
							required
						/>
						<label htmlFor="password">Password</label>
					</div>
					<div className="input-field col s6">
						<input
							onChange={({ target }) => setPassword2(target.value)}
							name="password2"
							type="password"
							className="validate"
							required
						/>
						<label htmlFor="confirm-password">Confirm password</label>
					</div>
				</div>
				<div className="row" style={{ display: "flex", justifyContent: "center" }}>
					<button
						onClick={handleRegister}
						className="btn waves-effect waves-light"
						type="submit">
						Submit <i className="material-icons right">send</i>
					</button>
				</div>
			</form>
		</Container>
	);
};

export default Register;
