const bcrypt = require("bcryptjs");
const Users = require("../models/dbhelpers"); // call db functions related to users table

function loginNavigationController(req, res) {
  return res.render("login");
}

async function loginPostController(req, res) {
  // Lookup user
  let username = req.body.Username;
  let password = req.body.Password;

  // Sanitise inputs first - prevent SQL injection!!!
  // Sanitise inputs - knex uses paramaetrised inputs so pretty secure already
  let inputs = [username, password];
  inputs.forEach((input) => {
    if (input.length <= 0) {
      return res.render("../views/login", {
        error: "All input fields required",
      });
    } else if (input.length < 5) {
      return res.render("../views/login", {
        error:
          "All input fields must contain at least 5 characters for security",
      });
    } else if (input == username) {
      if (hasSpecialChars(input)) {
        return res.render("../views/login", {
          error: `Selected special characters not allowed`,
        });
      }
    }
  });

  // Find our user
  Users.findUserByUsername(username)
    .then((user) => {
      // If no user found
      //console.log("user: ", user);
      if (!user) {
        return res.render("../views/login", {
          error: "User not found",
        });
      }
      // Compare input password vs hashed password.
      if (user && bcrypt.compareSync(password, user.password)) {
        // Set session information to allow login
        req.session.user = {
          id: user.id,
          username: user.username,
          email: user.email,
        };
        // Go to dashboard route
        return res.redirect("/dashboard");
      } else {
        return res.render("../views/login", {
          error: "Incorrect password",
        });
      }
    })
    .catch((err) => {
      return res.render("../views/login", {
        error: "Log in error",
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
  loginNavigationController,
  loginPostController,
  hasSpecialChars,
};
