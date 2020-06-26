const passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	{ User } = require("../models"),
	bcrypt = require("bcryptjs");

passport.use(
	new LocalStrategy({ usernameField: "username" }, async (username, password, done) => {
		// Check username
		let user = await User.findOne({ username: username });
		if (!user) return done(null, false);
		else {
			// Check password
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done({ message: "Incorrect password." }, false);
				}
			});
		}
	})
);
passport.serializeUser((user, done) => {
	done(null, { _id: user._id, username: user.username, company: user.company, auth: true });
});
passport.deserializeUser((obj, done) => {
	done(null, obj);
});

module.exports = passport;
