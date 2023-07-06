var express = require("express");
var router = express.Router();
const db = require("../config/database");
var bcrypt = require("bcryptjs");

router.get("/", function (req, res, next) {
  res.render("register", { data: "" });
});

module.exports = router;
