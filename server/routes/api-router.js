const { User, Employee } = require("../models/");
const passport = require("../config/passport");
const isAuth = require("../config/middleware/isAuth");
const { ObjectId } = require("mongoose").Types;
/**
 *
 * @param {string} message
 * @param {"error" | "success"} type
 */
const flash = (message, type) => {
	return {
		flash: {
			message: message,
			type: type
		}
	};
};

/**
 * Respond to /api/ calls from the client
 * @param {import("express").Router} router
 */
module.exports = (router) => {
	router.get("/api/employees/:company", async (req, res) => {
		const employees = await Employee.find({ company: req.params.company });
		res.status(200).json(employees).end();
	});
	router.get("/api/employees-demo", async (req, res) => {
		const employees = await Employee.find({ company: "Eagle Jump" });
		res.status(200).json(employees).end();
	});
	router.delete("/api/employee/:id", async (req, res) => {
		if (!req.user) {
			return res.json({
				flash: {
					message: "Must be logged in.",
					type: "error"
				}
			});
		}
		try {
			const deletion = await Employee.findByIdAndDelete({ _id: ObjectId(req.params.id) });
			res.json({
				flash: {
					message: `Deleted employee with ID ${req.params.id}`,
					type: "success"
				},
				employee: { ...deletion._doc }
			}).end();
		} catch (error) {
			res.json({
				flash: {
					message: `Internal server error.`,
					type: "error"
				}
			}).end();
		}
	});
	router.post("/api/register", async ({ body }, res) => {
		const isInvalid =
			Object.values(body).filter((field) => field === null || field === "").length > 0
				? true
				: false;
		if (isInvalid) {
			res.json({
				...flash("Missing fields.", "error"),
				redirect: "/register"
			});
			return;
		}
		if (body.password === body.password2) {
			let user = new User({
				username: body.username,
				email: body.email,
				password: body.password,
				company: body.company
			});
			try {
				await user.encryptPass();
				await User.create(user.toObject());
				res.status(200).json({
					...flash(`Welcome, ${body.username}!`, "success"),
					redirect: "/login"
				});
			} catch (error) {
				let fields = Object.keys(error.keyValue);
				let field = fields.length > 0 ? fields[0] : null;
				res.json({
					...flash(`User with that ${field} already exists!`, "error"),
					success: false,
					redirect: "/register"
				});
			}
		} else {
			res.json({ ...flash("Passwords must match!", "error"), redirect: "/register" });
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
					},
					redirect: "/login"
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
					},
					redirect: "/login"
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
						company: user.company,
						auth: true
					},
					flash: {
						type: "success",
						message: `Welcome, ${req.user.username}!`
					},
					redirect: "/"
				});
			});
		})(req, res, next);
	});
	router.get("/api/user-status", (req, res) => {
		switch (!!req.user) {
			case true:
				res.status(200).json(req.user).end();
				break;
			default:
			case false:
				res.json({
					_id: null,
					username: "Guest",
					company: "Eagle Jump",
					auth: false
				}).end();
				break;
		}
	});
	router.get("/api/logout", (req, res) => {
		req.logout();
		res.json({
			user: {
				username: "Guest",
				auth: false
			},
			flash: {
				message: "Logged out.",
				type: "success"
			},
			redirect: "/login"
		});
	});
	router.post("/api/employees", async (req, res) => {
		if (!req.user) {
			return res.json({
				...flash("You must login to add employees.", "error"),
				redirect: "/login"
			});
		}
		try {
			let response = await Employee.create(req.body);
			res.json({
				...flash(`Sucessfully added ${response.firstName} ${response.lastName}!`),
				employee: response
			});
		} catch (error) {
			if (error._message === "Employee validation failed") {
				res.json({
					...flash("Missing fields.", "error")
				});
			} else {
				res.json(flash("Internal server error.", "error"));
			}
		}
	});
};
