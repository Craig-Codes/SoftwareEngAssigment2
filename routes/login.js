var express = require("express");
var router = express.Router();
const db = require("../config/database");
var bcrypt = require("bcryptjs");

router.get("/", function (req, res, next) {
  res.render("login", { data: "" });
});

router.post("/", async (req, res) => {
  try {
    const { Username, Password } = req.body;
    // Make sure there is a Username and Password in the request
    if (!(Username && Password)) {
      res.status(400).send("All input is required");
    }

    let user = [];

    var sql = "SELECT * FROM Users WHERE Username = ?";
    db.all(sql, Username, function (err, rows) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }

      rows.forEach(function (row) {
        user.push(row);
      });

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
      res.locals.user = user[0].Username;
      console.log("local user is", res.locals.user);
      res.redirect("/dashboard");
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
