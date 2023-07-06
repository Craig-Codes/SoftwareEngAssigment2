var sqlite3 = require("sqlite3").verbose();
var bcrypt = require("bcryptjs");

// Create and popualte table
let db = new sqlite3.Database("Usersdb.sqlite", (err) => {
  if (err) {
    // cannot open db
    console.log(err.message);
  } else {
    var salt = bcrypt.genSaltSync(10); // Generate salt value

    // db.run('DROP TABLE Users');

    db.run(
      `CREATE TABLE Users (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Username text, 
        Email text, 
        Password text,             
        Salt text   
        )`,
      (err) => {
        if (err) {
          // Table already created
        } else {
          // Table just created, creating some rows
          var insert =
            "INSERT INTO Users (Username, Email, Password, Salt) VALUES (?,?,?,?)";
          db.run(insert, [
            "user1",
            "user1@example.com",
            bcrypt.hashSync("user1", salt),
            salt,
          ]);
          db.run(insert, [
            "user2",
            "user2@example.com",
            bcrypt.hashSync("user2", salt),
            salt,
          ]);
          db.run(insert, [
            "user3",
            "user3@example.com",
            bcrypt.hashSync("user3", salt),
            salt,
          ]);
          db.run(insert, [
            "user4",
            "user4@example.com",
            bcrypt.hashSync("user4", salt),
            salt,
          ]);
        }
      }
    );
    console.log("db created");
  }
});

module.exports = db;
