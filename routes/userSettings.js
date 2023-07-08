var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  return res.render("settings", {});
});

router.post("/logout", (req, res, next) => {
  console.log(req.session);
  // if a session exists
  if (req.session) {
    req.session.destroy();
    return res.render("../views/login", {
      error: "Logged out",
    });
  }
  // Re-direct to login page
  return res.render("../views/login");
});

module.exports = router;
