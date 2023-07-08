require("dotenv").config(); // gives access to .env file
const express = require("express");
const session = require("express-session"); // library for handling session cookies
const cors = require("cors");

const server = express();
// Port 3001 is fallback if env can't be read
const port = process.env.PORT || 3001;

// parse requests of content-type - application/json
server.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
server.use(express.urlencoded({ extended: true }));

// setup session cookies
sessionConfig = {
  name: "coursework2cookie",
  secret: process.env.SECRET,
};

server.use(session(sessionConfig));

server.set("view engine", "ejs"); //setting view engine to ejs

// Routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");

server.use("/", loginRoute);
server.use("/login", loginRoute);
server.use("/register", registerRoute);
server.use("/dashboard", dashboardRoute);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
