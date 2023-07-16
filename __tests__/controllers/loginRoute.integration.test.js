const express = require("express");
const request = require("supertest");
const loginRoute = require("../../routes/login");

// Setup server
const app = express();
app.use(express.json()); // accept json from the client
app.use("/login", loginRoute); // go to our register route

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

describe("Integration test for  login api", () => {
  it("GET /login - success - load login page", async () => {
    await request(app).get("/login").expect(200);
  });

  it("POST /login - succcess - match user in db", async () => {
    const res = {
      render: jest.fn(),
    };

    await request(app)
      .post("/login")
      .send({
        Username: "craig",
        Password: "craig",
      })
      .expect(200);
  });
});
