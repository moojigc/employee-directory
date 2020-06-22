const express = require("express"),
	session = require("express-session"),
	mongoose = require("mongoose"),
	MongoDBStore = require("connect-mongodb-session")(session),
	passport = require("./server/config/passport"),
	compression = require("compression"),
	{ join } = require("path"),
	cors = require("cors"),
	PORT = process.env.PORT || 3500,
	MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/employee-directory";

mongoose
	.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then((conn) => {
		if (conn) console.log(`Connected to ${conn.connections[0].db.databaseName}`);
	})
	.catch(console.error);

const Store = new MongoDBStore({
	uri: MONGODB_URI,
	collection: "user-sessions"
});
Store.on("error", (error) => console.log(error));

const app = express();
app.use(express.static(join(__dirname, "client/build")))
	.use(compression())
	.use(express.urlencoded({ extended: true }))
	.use(express.json())
	// Session middleware
	.use(
		session({
			secret: process.env.SESS_SECRET || "deku",
			resave: true,
			saveUninitialized: false,
			store: Store,
			sameSite: true
		})
	)
	.use(passport.initialize())
	.use(passport.session())
	.use(cors({ credentials: true }));
// Set routes
require("./server/routes/api-router")(app);
app.get("*", (req, res) => {
	res.sendFile(join(__dirname, "client/build/index.html"));
});
app.listen(PORT, (error) => {
	if (error) throw error;
	else console.log(`Listening on ${PORT}`);
});
