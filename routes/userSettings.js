var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("settings", {});
});

router.post("/logout", (req, res, next) => {
  console.log(req.session);
  // if a session exists
  if (req.session) {
    req.session.destroy();
    res.render("../views/login", {
      error: "Logged out",
    });
  }
  // Re-direct to login page
  res.render("../views/login");
});

module.exports = router;
