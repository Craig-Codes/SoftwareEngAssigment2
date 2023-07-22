const bcrypt = require("bcryptjs");
const Users = require("../models/dbhelpers"); // call db functions related to users table

function registerNavigationController(req, res) {
  return res.render("register");
}

function registerPostController(req, res) {
  // Get Inputs from POST
  const user = req.body;
  // Individually sanitise inputs
  let username = req.body.Username;
  let email = req.body.Email;
  let password = req.body.Password;

  // Sanitise inputs
  let inputs = [username, email, password];
  inputs.forEach((input) => {
    if (input.length <= 0) {
      return res.render("../views/register", {
        error: "All input fields required",
      });
    } else if (input.length < 5) {
      return res.render("../views/register", {
        error:
          "All input fields must contain at least 5 characters for security",
      });
    } else if (input.length > 50) {
      return res.render("../views/register", {
        error: "Inputs cannot be greater than 50 characters",
      });
    } else if (input == username || input == email) {
      if (hasSpecialChars(input)) {
        return res.render("../views/register", {
          error: `Selected special characters not allowed`,
        });
      }
    }
  });

  // Encrypt passwords so they are not stored in plain text
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
        return res.redirect("/dashboard");
      });
    })
    .catch((err) => {
      // ACTUALLY want to redirect back to register page with flash message
      return res.render("../views/register", {
        error: "Error, username and email address must be unique",
      });
    });
}

function hasSpecialChars(str) {
  const specialCharsSet = new Set("-#$%^&*():;");
  for (let letter of str) {
    if (specialCharsSet.has(letter)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  registerNavigationController,
  registerPostController,
  hasSpecialChars,
};
