const express = require("express");
const session = require("express-session");
const { connect } = require("mongoose");
const passport = require("./server/config/passport");
const compression = require("compression");
const morgan = require("morgan");
const { join } = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const MongoDBStore = require("connect-mongodb-session")(session);
const PORT = process.env.PORT || 3500;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/employee_directory";

connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  dbName: "employee_directory",
})
  .then((conn) => {
    if (conn)
      console.log(`Connected to ${conn.connections[0].db.databaseName}`);
  })
  .catch(console.error);

const Store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "user-sessions",
});
Store.on("error", (error) => console.log(error));

const app = express();
app
  .use(express.static(join(__dirname, "client/build")))
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(morgan("dev"))
  // Session middleware
  .use(cors({ credentials: true, origin: "http://localhost:3000" }))
  .use(
    session({
      secret: process.env.SESS_SECRET || "deku",
      resave: false,
      saveUninitialized: true,
      store: Store,
      cookie: {
        sameSite: true,
        httpOnly: true,
        secure: false,
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(compression());
// Set routes
require("./server/routes/api-router")(app);
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "client/build/index.html"));
});
app.listen(PORT, (error) => {
  if (error) throw error;
  else console.log(`Listening on ${PORT}`);
});
