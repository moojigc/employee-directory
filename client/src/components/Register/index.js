import React from "react";

const Register = () => {
	return (
		<form class="col s12">
			<div class="row">
				<div class="input-field col s12">
					<input type="email" class="validate" required />
					<label for="email">Email</label>
				</div>
			</div>
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
			<div class="row">
				<div class="input-field col s12">
					<input type="password" class="validate" required />
					<label for="confirm-password">Confirm password</label>
				</div>
			</div>
			<div class="row">
				<div class="input-field col s12">
					<input id="email" type="email" class="validate" required />
					<label for="email">Email</label>
				</div>
			</div>
			<div class="row">
				<div class="col s12">
					This is an inline input field:
					<div class="input-field inline">
						<input id="email_inline" type="email" class="validate" />
						<label for="email_inline">Email</label>
						<span class="helper-text" data-error="wrong" data-success="right">
							Helper text
						</span>
					</div>
				</div>
			</div>
		</form>
	);
};
