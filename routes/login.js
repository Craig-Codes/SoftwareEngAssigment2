const express = require("express");
const router = express.Router();
const knex = require("knex"); // lets us write SQL querys in JavaScript
//var bcrypt = require("bcryptjs");
const Users = require("../models/dbhelpers"); // call db functions related to users table

// req.body is json values sent to server, usually from a form submit - POST and PUT
// req.params is header info sent from client - attached to url on : routes e.g. /:id. The id would be the params = req.params.id

// Get - get some info - request it from server which returns somethign e.g. a page
// Post - Upload some infor to server throguh req.body
// Delete - Remove something from server - use /:id or anothe unique feature, send in URL and retreived with req.params.id
// Put - Incremental changes - updates rather than creates whole submission - use /: to get resource, and req.body to send the changes -> Using URL params (identofy resource) AND create req.body (changes we want to make)
// Patch - More efficient - just specify what changes you want to make or add values, dont send entire object.

router.get("/", (req, res, next) => {
  res.render("login", { data: "" });
});

router.post("/", async (req, res) => {
  const postInfo = req.body;
  //const postInfo = req.params;
  console.log(postInfo);
  res.status(201).json(postInfo);
  Users.find(req.body.username).then((user) => {
    // Check if found user
  });
  // Get info

  // Validat Info

  // Query DB

  // try {
  //   console.log(req.body);
  //   const { Username, Password } = req.body;
  //   // Make sure there is a Username and Password in the request
  //   if (!(Username && Password)) {
  //     res.status(400).send("All input is required");
  //   }
  //   let user = [];
  //   var sql = "SELECT * FROM Users WHERE Username = ?";
  //   db.all(sql, Username, function (err, rows) {
  //     if (err) {
  //       res.status(400).json({ error: err.message });
  //       return;
  //     }
  //     rows.forEach(function (row) {
  //       user.push(row);
  //     });
  // var PHash = bcrypt.hashSync(Password, user[0].Salt);
  // if (PHash === user[0].Password) {
  //   // * CREATE JWT TOKEN
  //   const token = jwt.sign(
  //     { user_id: user[0].Id, username: user[0].Username },
  //     process.env.TOKEN_KEY,
  //     {
  //       expiresIn: "1h", // 60s = 60 seconds - (60m = 60 minutes, 2h = 2 hours, 2d = 2 days)
  //     }
  //   );
  //   user[0].Token = token;
  //   // Add token to user db entry???
  // } else {
  //   return res.status(400).send("No Match");
  // }
  //res.locals.user = user[0].Username;
  //console.log("local user is", res.locals.user);
  //res.redirect("/dashboard");
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });
});

module.exports = router;
