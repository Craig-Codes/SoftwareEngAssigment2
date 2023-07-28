require("dotenv").config(); // gives access to .env file
const express = require("express");
const session = require("express-session"); // library for handling session cookies
const path = require("path");
const sassMiddleware = require("node-sass-middleware");

const server = express();
// Port 3001 is fallback if env can't be read
const port = process.env.PORT || 3001;

// parse requests of content-type - application/json
server.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));
// Use Bootstrap css framework - first setup custom sass
server.use(
  sassMiddleware({
    src: path.join(__dirname, "bootstrap"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true,
    sourceMap: true,
  })
);
// Use bootstrap
server.use(express.static(path.join(__dirname, "public")));

// setup session cookies
sessionConfig = {
  name: "coursework2cookie",
  secret: process.env.SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1hr timer
    secure: false, // for prod this need to be true for HTTPS only access
    httpOnly: true, // stops JavaScript from accessing the cookie
  },
  resave: false,
  saveUninitialized: true, // dont require user to accept. Needs to be false in prod due to GDPR
  // Users need to concept to cookies in GDPR
};

// server creates a session, which express-session library handles for us
server.use(session(sessionConfig));

server.set("view engine", "ejs"); //setting view engine to ejs

// Routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");
const restricted = require("./middleware/restricted-middleware");
const settingsRoute = require("./routes/settings");
const recoveryRoute = require("./routes/recovery");
const eventsRoute = require("./routes/events");
const tasksRoute = require("./routes/tasks");

server.use("/", loginRoute);
server.use("/login", loginRoute);
server.use("/register", registerRoute);
server.use("/recovery", recoveryRoute);
server.use("/dashboard", restricted, dashboardRoute);
server.use("/settings", restricted, settingsRoute);
server.use("/events", restricted, eventsRoute);
server.use("/tasks", restricted, tasksRoute);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
