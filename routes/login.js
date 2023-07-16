const express = require("express");
const router = express.Router();

const {
  loginNavigationController,
  loginPostController,
} = require("../controllers/login");

// req.body is json values sent to server, usually from a form submit - POST and PUT
// req.params is header info sent from client - attached to url on : routes e.g. /:id. The id would be the params = req.params.id

// Get - get some info - request it from server which returns somethign e.g. a page
// Post - Upload some infor to server throguh req.body
// Delete - Remove something from server - use /:id or anothe unique feature, send in URL and retreived with req.params.id
// Put - Incremental changes - updates rather than creates whole submission - use /: to get resource, and req.body to send the changes -> Using URL params (identofy resource) AND create req.body (changes we want to make)
// Patch - More efficient - just specify what changes you want to make or add values, dont send entire object.

router.get("/", loginNavigationController);

router.post("/", loginPostController);

module.exports = router;
