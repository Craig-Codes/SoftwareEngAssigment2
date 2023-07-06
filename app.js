const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser"); // Get submitted form data from POST requests

const db = require("./config/database");

const app = express();
const port = 3000;

//require("dotenv").config(); // allow app to read .env file
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs"); //setting view engine to ejs

// Routes
const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const dashboardRoute = require("./routes/dashboard");

app.use("/", loginRoute);
app.use("/login", loginRoute);
app.use("/register", registerRoute);
app.use("/dashboard", dashboardRoute);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
