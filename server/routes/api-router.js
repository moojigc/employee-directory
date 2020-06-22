const { User } = require("../models/");

/**
 * Respond to /api/ calls from the client
 * @param {import("express").Router} router
 */
module.exports = (router) => {
	router.get("/api/employees", (req, res) => {
		const employees = [
			{
				name: "Moojig",
				job: "nothing"
			}
		];
		res.status(200).json(employees).end();
	});
	router.post("/api/register", async ({ body }, res) => {
		let response = await User.create(body);
		if (response)
			res.status(200).json({ message: `Welcome ${body.username}!`, redirect: "/login" });
		else res.status(500).json({ message: "Internal server error.", redirect: "/register" });
	});
};
