var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  console.log(req.session);
  return res.render("dashboard", {
    username: req.session.user.username,
    email: req.session.user.email,
  });
});

module.exports = router;
