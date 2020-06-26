import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Main from "../Main";
import Container from "../Container";
import Header from "../Header";
import SubmitBtn from "../SubmitBtn";
import axios from "axios";
import Alert from "../Alert";
import { useUserContext } from "../../utils/UserContext";
import { useFlashContext } from "../../utils/FlashContext";

/**
 * Login page
 * @param {Object} options
 * @param {string} options.flash
 * @param {Function} options.dispatchFlash
 * @param {Function} options.setUser
 */
const Login = () => {
	const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, dispatchUser] = useUserContext();
	const [flash, dispatchFlash] = useFlashContext();
	const handleLogin = async (event) => {
		event.preventDefault();
		// const user = { username: username, password: password };
		try {
			let { data } = await axios({
				url: "/api/login",
				method: "POST",
				data: { username: username, password: password },
				withCredentials: true
			});
			dispatchFlash({ flash: data.flash });
			if (data.user.auth) dispatchUser({ user: data.user });
			history.push(data.redirect);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<Container>
				<Header>Login</Header>
				<Main>
					<div width="max-content">
						<div
							className="inner-wrapper"
							style={{ background: "var(--secondary)", width: "fit" }}>
							<div style={{ textAlign: "center" }}>
								Don't have an account yet? <Link to="/register">Sign up here.</Link>
							</div>
						</div>
					</div>
					<form className="col s12">
						<div className="row">
							<div className="input-field col s12">
								<i className="material-icons prefix">account_circle</i>
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
								<i className="material-icons prefix">vpn_key</i>

								<input
									onChange={({ target }) => setPassword(target.value)}
									type="password"
									className="validate"
									required
								/>
								<label htmlFor="password">Password</label>
							</div>
						</div>
						{flash.message ? <Alert type={flash.type}>{flash.message}</Alert> : null}

						<SubmitBtn handleClick={handleLogin} />
					</form>
				</Main>
			</Container>
		</div>
	);
};

export default Login;
