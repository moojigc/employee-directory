import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Container from "../Container";
import axios from "axios";
import Header from "../Header";
import Main from "../Main";
import { useFlashContext } from "../../utils/FlashContext";
import Alert from "../Alert";

const Register = () => {
	const [username, setUsername] = useState("");
	const [company, setCompany] = useState("");
	const [password, setPassword] = useState("");
	const [password2, setPassword2] = useState("");
	const [email, setEmail] = useState("");
	const history = useHistory();
	const [flash, dispatchFlash] = useFlashContext();

	const handleRegister = async (event) => {
		if (
			!username.length ||
			!company.length ||
			!password.length ||
			!password2.length ||
			!email.length
		) {
			dispatchFlash({ flash: { message: "All fields required!", type: "error" } });
			return;
		}
		event.preventDefault();
		let { data } = await axios.post("/api/register", {
			username: username,
			password: password,
			password2: password2,
			email: email,
			company: company
		});
		history.push(data.redirect);
		dispatchFlash({ flash: data.flash });
	};
	return (
		<div>
			<Container>
				<Header>Register</Header>
				<Main>
					<div width="max-content">
						<div
							className="inner-wrapper"
							style={{ background: "var(--secondary)", width: "fit" }}>
							<div style={{ textAlign: "center" }}>
								Have an account? <Link to="/login">Login here.</Link>
							</div>
						</div>
					</div>
					<form className="col s12">
						<div className="row">
							<div className="input-field col s12">
								<i className="material-icons prefix">people_outline</i>
								<label htmlFor="email">Name of Company/Organization</label>
								<input
									onChange={({ target }) => setCompany(target.value)}
									name="companyName"
									type="text"
									className="validate"
									required
								/>
							</div>
						</div>
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
						{flash.message ? <Alert type={flash.type}>{flash.message}</Alert> : null}

						<div className="row" style={{ display: "flex", justifyContent: "center" }}>
							<button
								onClick={handleRegister}
								className="btn waves-effect waves-light"
								type="submit">
								Submit <i className="material-icons right">send</i>
							</button>
						</div>
					</form>
				</Main>
			</Container>
		</div>
	);
};

export default Register;
