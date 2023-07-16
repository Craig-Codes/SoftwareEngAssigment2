const express = require("express");
const request = require("supertest");
const registerRoute = require("../../routes/register");

// Setup server
const app = express();
app.use(express.json()); // accept json from the client
app.use("/register", registerRoute); // go to our register route

//app.set("views", "../../views");
app.set("view engine", "ejs");

describe("Integration test for  register api", () => {
  it("GET /register - success - load register page", async () => {
    await request(app).get("/register").expect(200);
  });
});
