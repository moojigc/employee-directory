const { User, Employee } = require("../models/");
const passport = require("../config/passport");
const isAuth = require("../config/middleware/isAuth");

/**
 * Respond to /api/ calls from the client
 * @param {import("express").Router} router
 */
module.exports = (router) => {
	router.get("/api/employees", async (req, res) => {
		const employees = await Employee.find({});
		res.status(200).json(employees).end();
	});
	router.get("/api/employees-demo", async (req, res) => {
		const employees = await Employee.find({ company: "Demo" });
		res.status(200).json(employees).end();
	});
	router.post("/api/register", async ({ body }, res) => {
		if (body.password === body.password2) {
			let user = new User({
				username: body.username,
				email: body.email,
				password: body.password
			});
			await user.encryptPass();
			let response = await User.create(user.toObject());
			if (response)
				res.status(200).json({ message: `Welcome ${body.username}!`, redirect: "/login" });
			else res.status(500).json({ message: "Internal server error.", redirect: "/register" });
		} else {
			res.json({ message: "Passwords must match!", redirect: "/register" });
		}
	});
	router.post("/api/login", (req, res, next) => {
		passport.authenticate("local", function (err, user, info) {
			if (err) {
				return res.json({
					flash: {
						...err,
						type: "error"
					},
					user: {
						auth: false
					}
				});
			}
			if (!user) {
				return res.json({
					flash: {
						message: "User not found.",
						type: "error"
					},
					user: {
						auth: false
					}
				});
			}
			req.logIn(user, function (err) {
				if (err) {
					return next(err);
				}
				return res.json({
					user: {
						_id: user._id,
						username: user.username,
						auth: true
					},
					flash: {
						type: "success",
						message: `Welcome, ${req.user.username}!`
					}
				});
			});
		})(req, res, next);
	});
	router.get("/api/user-status", (req, res) => {
		switch (!!req.user) {
			case true:
				res.status(200)
					.json({ ...req.user, auth: true })
					.end();
				break;
			default:
			case false:
				res.json({ username: "Guest", password: "", auth: false }).end();
				break;
		}
	});
	router.get("/api/logout", (req, res) => {
		req.logout();
		res.json({
			user: {
				auth: false
			},
			flash: {
				message: "Logged out.",
				type: "success"
			},
			redirect: "/login"
		});
	});
};
