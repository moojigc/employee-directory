module.exports = function (req, res, next) {
	if (req.user) {
		return next();
	} else {
		res.status(401).json({ auth: false, message: "Please login to view this resource." });
	}
};
