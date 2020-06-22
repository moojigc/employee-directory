import React from "react";
import Container from "../Container";
import "./index.css";

const Register = () => {
	return (
		<Container>
			<form class="col s12">
				<div class="row">
					<div class="input-field col s12">
						<i class="material-icons prefix">email</i>
						<input type="email" class="validate" required />
						<label for="email">Email</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s12">
						<i class="material-icons prefix">account_circle</i>
						<input type="email" class="validate" required />
						<label for="email">Username</label>
					</div>
				</div>
				<div class="row">
					<div class="input-field col s6">
						<i class="material-icons prefix">vpn_key</i>
						<input type="password" class="validate" required />
						<label for="password">Password</label>
					</div>
					<div class="input-field col s6">
						<input type="password" class="validate" required />
						<label for="confirm-password">Confirm password</label>
					</div>
				</div>
				<div className="row" style={{ display: "flex", justifyContent: "center" }}>
					<button className="btn waves-effect waves-light" type="submit">
						Submit <i className="material-icons right">submit</i>
					</button>
				</div>
			</form>
		</Container>
	);
};

export default Register;
