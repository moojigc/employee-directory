const passport = require("passport"),
	LocalStrategy = require("passport-local").Strategy,
	{ User } = require("../models"),
	bcrypt = require("bcryptjs");

passport.use(
	new LocalStrategy({ usernameField: "username" }, async (username, password, done) => {
		// Check username
		let user = await User.findOne({ username: username });
		console.log(user);
		if (!user) return done(null, false);
		else {
			// Check password
			bcrypt.compare(password, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		}
	})
);
passport.serializeUser((user, done) => {
	done(null, { id: user._id, username: user.username });
});
passport.deserializeUser((obj, done) => {
	done(null, obj);
});

module.exports = passport;
