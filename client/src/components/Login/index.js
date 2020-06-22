import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Main from "../Main";
import Container from "../Container";
import Header from "../Header";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";
import Alert from "../Alert";

/**
 * Login page
 * @param {Object} options
 * @param {string} options.flash
 * @param {Function} options.setFlash
 * @param {Function} options.setUser
 */
const Login = ({ flash, setFlash, setUser }) => {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = async (event) => {
		event.preventDefault();
		const user = { username: username, password: password };
		try {
			let { data } = await axios({
				url: "/api/login",
				method: "POST",
				data: user,
				withCredentials: true
			});
			if (data.auth) {
				setFlash(data.message);
				setUser(data);
				history.push("/");
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container>
			<Header>Login</Header>
			<Main>
				{flash !== "" ? <Alert type={"error"}>{flash}</Alert> : null}
				<form className="col s12">
					<div className="row">
						<div className="input-field col s12">
							<input
								onChange={({ target }) => setUsername(target.value)}
								type="email"
								className="validate"
								required
							/>
							<label htmlFor="email">Username</label>
						</div>
					</div>
					<div className="row">
						<div className="input-field col s12">
							<input
								onChange={({ target }) => setPassword(target.value)}
								type="password"
								className="validate"
								required
							/>
							<label htmlFor="password">Password</label>
						</div>
					</div>
					<SubmitBtn handleClick={handleLogin} />
				</form>
			</Main>
		</Container>
	);
};

export default Login;
