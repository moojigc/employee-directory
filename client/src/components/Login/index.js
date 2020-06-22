import React from "react";

const Login = () => {
	return (
		<form class="col s12">
			<div class="row">
				<div class="input-field col s12">
					<input type="email" class="validate" required />
					<label for="email">Username</label>
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
					<input type="password" class="validate" required />
					<label for="password">Password</label>
				</div>
			</div>
		</form>
	);
};

export default Login;
