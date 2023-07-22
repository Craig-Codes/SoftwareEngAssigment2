// all knex queries
const knex = require("knex");
// all queries need to know about our database, such as the type and location
const config = require("../knexfile");
const db = knex(config.development);

// Tutorial 9 for all this

module.exports = {
  addUser,
  findAllUsers,
  findUserByUsername,
  updatePassword,
};

// Each function needs to be async as takes time. Await result. Need promise to complete first.

// Insert a record
async function addUser(user) {
  return await db("users").insert(user, ["id", "username", "email"]);
}

function findAllUsers() {
  return db("users");
}

// Find a user
function findUserByUsername(username) {
  return db("users").where({ username: username }).first();
}

// Update a users password
function updatePassword(username, newPassword) {
  return db("users")
    .where({ username: username })
    .update({ password: newPassword });
}
