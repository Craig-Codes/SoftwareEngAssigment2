var express = require("express");
var router = express.Router();
const Users = require("../models/dbhelpers"); // call db functions related to users table

function loginRoute() {
  console.log("route cahnge");
  res.redirect("/login");
}

router.get("/", (req, res, next) => {
  res.render("register", { data: "" });
});

router.post("/", (req, res) => {
  // Santise inputs first!!!!!
  console.log("request body: ", req.body);

  Users.add(req.body) // Gets the POST info
    .then((user) => {
      res.status(200).json(user);
      console.log(user);
    })
    .catch((err) => {
      // ACTUALLY want to redirect back to register page with flash message
      res.status(500).json({
        message: "Can't add user ... username or email is not unique!",
      });
    });
});

module.exports = router;
