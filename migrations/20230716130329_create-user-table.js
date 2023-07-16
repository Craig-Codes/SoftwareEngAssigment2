/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// Guide on this - asl see knex docs for dsqlite - https://www.youtube.com/watch?v=JWMf7AUzMkA

// If DROP Table, this command re-creates:
// Delete the appDatabase.sqlite3 file from /data
// npx knex migrate:latest

// Lesson 19 for creating new tables: knex create xxx

exports.up = function (knex) {
  // Add debug() to see what SQL this gets turned into!
  return knex.schema.debug().createTable("user", (table) => {
    table.increments(); // auto-incrementing unique ID primary key
    table.text("username", 128).notNullable().unique();
    table.text("email", 128).notNullable().unique();
    table.string("password").notNullable();
  });

  // can chain, just add .createTable('events', (table) => { ...})
  // Watch youtube vid before setting up mor etables! V. good about what we need to do about foregin keys - id's which relate to data in other tables. Sucha s Cascade on deelte or update of vaules etc.
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

// This method deals with how to undo any changes
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user");
};
