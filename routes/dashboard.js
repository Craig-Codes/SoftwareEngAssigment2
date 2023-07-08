var express = require("express");
var router = express.Router();

router.get("/", (req, res, next) => {
  // console.log("HIT dashbaord route");
  // console.log(req.body);
  // username = req.body.username;
  // email = req.body.email;
  // console.log(username, email);
  // res.render("dashboard", { username, email });
});

module.exports = router;
