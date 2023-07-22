const bcrypt = require("bcryptjs");
const Users = require("../models/dbhelpers"); // call db functions related to users table

function settingsNavigationController(req, res) {
  return res.render("settings", {
    username: req.session.user.username,
    email: req.session.user.email,
  });
}

function logoutUser(req, res) {
  console.log(req.session);
  // if a session exists
  if (req.session) {
    req.session.destroy();
    return res.render("../views/login", {
      success: "Successfully logged out",
    });
  }
  // Re-direct to login page
  return res.render("../views/login");
}

function passwordNavigationController(req, res) {
  return res.render("resetPassword", {
    username: req.session.user.username,
    email: req.session.user.email,
  });
}

async function changePassword(req, res) {
  // Store form input information
  let inputPassword = req.body.CurrentPassword;
  let newPassword = req.body.NewPassword1;
  let passwordCheck = req.body.NewPassword2;

  let retreivedPassword; // returned password from db

  // Sanitise inputs first
  let inputs = [inputPassword, newPassword, passwordCheck];
  inputs.forEach((input) => {
    if (input.length <= 0) {
      return res.render("../views/resetPassword", {
        error: "All input fields required",
      });
    } else if (input.length < 5) {
      return res.render("../views/resetPassword", {
        error: "Password must be at least 5 characters long",
      });
    }
  });

  // Compare new password inputs to ensure they are the same
  // We only want to query te database once all other checks completed - reduce latency
  if (newPassword !== passwordCheck) {
    return res.render("../views/resetPassword", {
      error: `New passwords do not match`,
    });
  }

  console.log(req.session.username);
  // All inputs worked - check if user password is correct
  await Users.findUserByUsername(req.session.user.username)
    .then((user) => {
      console.log("found user ==== ", user);
      // If no user found - should be impossible at this point
      if (!user) {
        return res.render("../views/login", {
          error: "Database Error, please contact administrator",
        });
      } else {
        retreivedPassword = user.password;
      }
    })
    .catch((err) => {
      return res.render("../views/login", {
        error: "Database Error, please contact administrator",
      });
    });

  // Compare input password vs hashed password.
  if (!bcrypt.compareSync(inputPassword, retreivedPassword)) {
    return res.render("../views/resetPassword", {
      error: "Current password is incorrect",
    });
  }

  // Encrypt password at rest
  const encrypedPassword = bcrypt.hashSync(newPassword, 12); // encrypt with bcrypt
  console.log(encrypedPassword);

  // replace password in db - redirect, password successfully updated
  await Users.updatePassword(req.session.user.username, encrypedPassword)
    .then(() => {
      return res.render("../views/resetPassword", {
        success: "Password successfully updated",
      });
    })
    .catch((err) => {
      return res.render("../views/login", {
        error: "Database Error, please contact administrator",
      });
    });
}

module.exports = {
  settingsNavigationController,
  logoutUser,
  passwordNavigationController,
  changePassword,
};
