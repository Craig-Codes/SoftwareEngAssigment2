const Users = require("../models/dbhelpers");
const generator = require("generate-password"); // Random pw generator package
const bcrypt = require("bcryptjs");
const mail = require("../services/mail");

async function recoveryNavigatorController(req, res) {
  return res.render("recovery");
}

async function recoveryPostController(req, res) {
  // Sanitise input
  let email = req.body.Email;

  if (email.length <= 0) {
    return res.render("../views/recovery", {
      error: "Email address is required",
    });
  }

  // Email couldnt not have been registeres if it doesnt fit these conditions
  if (email.length < 5 || email.length > 50 || hasSpecialChars(email)) {
    return res.render("../views/recovery", {
      error: "Not a registered email address",
    });
  }

  // Address is in db
  await Users.findEmail(email)
    .then((user) => {
      if (!user) {
        return res.render("../views/recovery", {
          error: "No user found with that email address",
        });
      }
    })
    .catch(() => {
      return res.render("../views/recovery", {
        error: "Not a registered email address",
      });
    });

  // Generate a new random password
  let password = generator.generate({
    length: 10,
    numbers: true,
  });

  // Encrypt pw and store in db
  // Encrypt passwords so they are not stored in plain text
  encryptedPassword = bcrypt.hashSync(password, 12); // 12 hash rounds. Created value will always be unique, even for same password

  // Replace current password with new password
  await Users.updatePasswordFromEmail(email, encryptedPassword).catch(() => {
    return res.render("../views/recovery", {
      error: "Unable to update password",
    });
  });

  // email generated password to user
  mail.sendMail(email, password);

  // redirect
  return res.render("../views/login", {
    success: "Recovery email sent, please check your inbox",
  });
}

module.exports = { recoveryNavigatorController, recoveryPostController };

function hasSpecialChars(str) {
  const specialCharsSet = new Set("-#$%^&*():;");
  for (let letter of str) {
    if (specialCharsSet.has(letter)) {
      return true;
    }
  }
  return false;
}
