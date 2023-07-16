// test that register route renders

const Users = require("../../models/dbhelpers"); // call db functions related to users table
const bcrypt = require("bcryptjs");

const {
  registerNavigationController,
  registerPostController,
  hasSpecialChars,
} = require("../../controllers/register");

// test login route
test("register renders", () => {
  // stubs
  const req = {};

  const res = {
    render: jest.fn(),
  };

  registerNavigationController(req, res);
  expect(res.render).toHaveBeenCalledWith("register");
});

// test Special Character function
test("special characters found", () => {
  expect(hasSpecialChars("-#$%^&*():;")).toBe(true);
});

test("special characters not found", () => {
  expect(hasSpecialChars("!testS7r1ng__")).toBe(false);
});

// test post route no password entered
test("login finds user and renders dashboard", async () => {
  // stubs
  const req = {
    body: {
      Username: "testUsername",
      Email: "test@Test.com",
      Password: "",
    },
  };

  const res = {
    render: jest.fn(),
  };

  await registerPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/register", {
    error: "All input fields required",
  });
});

// test short inputs
test("Register finds user and renders dashboard", async () => {
  // stubs
  const req = {
    body: {
      Username: "abcd",
      Email: "test@Test.com",
      Password: "abcd",
    },
  };

  const res = {
    render: jest.fn(),
  };

  await registerPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/register", {
    error: "All input fields must contain at least 5 characters for security",
  });
});

// Inputs no longer than 50 characters
test("Inoutsis too long", async () => {
  // stubs
  const req = {
    body: {
      Username:
        "abcdaefefwefwa878768768FEWFAEsafwagrwrgwrgwrgwagwrgwaergwaegw425451324632564125615624574216",
      Email: "test@Test.com",
      Password: "abcd",
    },
  };

  const res = {
    render: jest.fn(),
  };

  await registerPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/register", {
    error: "Inputs cannot be greater than 50 characters",
  });
});
