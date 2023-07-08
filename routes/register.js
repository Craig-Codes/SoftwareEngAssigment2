var express = require("express");
var router = express.Router();
const Users = require("../models/dbhelpers"); // call db functions related to users table
const bcrypt = require("bcryptjs");

function loginRoute() {
  res.redirect("/login");
}

router.get("/", (req, res, next) => {
  res.render("register", { data: "" });
});

router.post("/", (req, res) => {
  // Get Inputs from POST
  const user = req.body;
  // Individually sanitise inputs
  let username = req.body.Username;
  let email = req.body.Email;
  let password = req.body.Password;

  console.log("username", username);
  console.log("email", email);
  console.log("password", password);

  // Check we have all input
  if (!username) {
    return res.render("../views/register", {
      error: "Username required",
    });
  }
  if (!email) {
    return res.render("../views/register", {
      error: "Email Address required",
    });
  }
  if (!password) {
    return res.render("../views/register", {
      error: "Password Address required",
    });
  }

  // Sanitise inputs
  password = bcrypt.hashSync(password, 12); // 12 hash rounds. Created value will always be unique, even for same password

  // Add to DB
  Users.addUser({ username, email, password }) // Gets the POST info
    .then((user) => {
      // Get the new user and update session information to allow login
      Users.findUserByUsername(username).then((user) => {
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        // Go to dashboard route
        res.redirect("/dashboard");
      });
    })
    .catch((err) => {
      // ACTUALLY want to redirect back to register page with flash message
      res.render("../views/register", {
        error: "Username and email address must both be unique",
      });
    });
});

module.exports = router;
