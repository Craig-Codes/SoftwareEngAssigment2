// all knex queries
const knex = require("knex");
// all queries need to know about our database, such as the type and location
const config = require("../knexfile");
const db = knex(config.development);

// Tutorial 9 for all this

module.exports = {
  add,
  find,
};

// Each function needs to be async as takes time. Await result. Need promise to complete first.

// Insert a record
async function add(user) {
  const [id] = await db("users").insert(user);
  return id;
}

// Find a user
async function find(user) {}
