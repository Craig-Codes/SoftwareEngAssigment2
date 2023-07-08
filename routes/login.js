const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/dbhelpers"); // call db functions related to users table

// req.body is json values sent to server, usually from a form submit - POST and PUT
// req.params is header info sent from client - attached to url on : routes e.g. /:id. The id would be the params = req.params.id

// Get - get some info - request it from server which returns somethign e.g. a page
// Post - Upload some infor to server throguh req.body
// Delete - Remove something from server - use /:id or anothe unique feature, send in URL and retreived with req.params.id
// Put - Incremental changes - updates rather than creates whole submission - use /: to get resource, and req.body to send the changes -> Using URL params (identofy resource) AND create req.body (changes we want to make)
// Patch - More efficient - just specify what changes you want to make or add values, dont send entire object.

router.get("/", (req, res, next) => {
  console.log(req.session);
  res.render("login");
});

router.post("/", async (req, res) => {
  // Lookup user
  let username = req.body.Username;
  let password = req.body.Password;
  console.log(username, password);

  // Sanitise inputs first - prevent SQL injection!!!
  // Sanitise inputs
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
});

function hasSpecialChars(str) {
  const specialCharsSet = new Set("-#$%^&*():;");
  for (let letter of str) {
    if (specialCharsSet.has(letter)) {
      return true;
    }
  }
  return false;
}

module.exports = router;
