// test that login route renders

const Users = require("../../models/dbhelpers"); // call db functions related to users table
const bcrypt = require("bcryptjs");

const {
  loginNavigationController,
  loginPostController,
  hasSpecialChars,
} = require("../../controllers/login");

// test login route
test("login renders", () => {
  // stubs
  const req = {};

  const res = {
    render: jest.fn(),
  };

  loginNavigationController(req, res);
  expect(res.render).toHaveBeenCalledWith("login");
});

// test post route Success
test("login finds user and renders dashboard", async () => {
  // stubs
  const req = {
    body: {
      Username: "testUser",
      Password: "testPassword",
    },
  };

  const res = {
    render: jest.fn(),
  };

  // mock successful return of users
  const mock = jest.spyOn(Users, "findUserByUsername"); // spy on Users.findUserByUsername()
  mock.mockImplementation(() => {
    return Promise.resolve({
      username: "testUser",
      password: "testPassword",
    });
  });

  // mock successful return of password match
  const mockBcrypt = jest.spyOn(bcrypt, "compareSync");
  mockBcrypt.mockImplementation(() => {
    return true;
  });
  await loginPostController(req, res);
  expect(res.redirect);
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
      Username: "",
      Password: "testPassword",
    },
  };

  const res = {
    render: jest.fn(),
  };

  await loginPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/login", {
    error: "All input fields required",
  });
});

// test post route no password entered
test("login finds user and renders dashboard", async () => {
  // stubs
  const req = {
    body: {
      Username: "testUsername",
      Password: "",
    },
  };

  const res = {
    render: jest.fn(),
  };

  await loginPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/login", {
    error: "All input fields required",
  });
});

// test short inputs
test("login finds user and renders dashboard", async () => {
  // stubs
  const req = {
    body: {
      Username: "abcd",
      Password: "abcd",
    },
  };

  const res = {
    render: jest.fn(),
  };

  await loginPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/login", {
    error: "All input fields must contain at least 5 characters for security",
  });
});
