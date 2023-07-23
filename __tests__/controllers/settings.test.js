const bcrypt = require("bcryptjs");
const Users = require("../../models/dbhelpers"); // call db functions related to users table

const { changePassword } = require("../../controllers/settings");

test("Blank input current password", async () => {
  // Need to stub data temporarily - need user session data for request object
  const req = {
    body: {
      CurrentPassword: "",
      NewPassword1: "password",
      NewPassword2: "password",
    },
    session: {
      user: {
        username: "testUser1",
        email: "testEmail@email.com",
      },
    },
  };

  const res = {
    render: jest.fn(),
  };

  await changePassword(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/resetPassword", {
    error: "All input fields required",
  });
});

test("Blank input new password 1", async () => {
  // Need to stub data temporarily - need user session data for request object
  const req = {
    body: {
      CurrentPassword: "testUser1",
      NewPassword1: "",
      NewPassword2: "password",
    },
    session: {
      user: {
        username: "testUser1",
        email: "testEmail@email.com",
      },
    },
  };

  const res = {
    render: jest.fn(),
  };

  await changePassword(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/resetPassword", {
    error: "All input fields required",
  });
});

test("Blank input new password 2", async () => {
  // Need to stub data temporarily - need user session data for request object
  const req = {
    body: {
      CurrentPassword: "testUser1",
      NewPassword1: "password",
      NewPassword2: "",
    },
    session: {
      user: {
        username: "testUser1",
        email: "testEmail@email.com",
      },
    },
  };

  const res = {
    render: jest.fn(),
  };

  await changePassword(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/resetPassword", {
    error: "All input fields required",
  });
});

test("New passwords do not match", async () => {
  // Need to stub data temporarily - need user session data for request object
  const req = {
    body: {
      CurrentPassword: "testUser1",
      NewPassword1: "password!",
      NewPassword2: "password",
    },
    session: {
      user: {
        username: "testUser1",
        email: "testEmail@email.com",
      },
    },
  };

  const res = {
    render: jest.fn(),
  };

  await changePassword(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/resetPassword", {
    error: "New passwords do not match",
  });
});

test("Short new password length", async () => {
  // Need to stub data temporarily - need user session data for request object
  const req = {
    body: {
      CurrentPassword: "testUser1",
      NewPassword1: "pass",
      NewPassword2: "pass",
    },
    session: {
      user: {
        username: "testUser1",
        email: "testEmail@email.com",
      },
    },
  };

  const res = {
    render: jest.fn(),
  };

  await changePassword(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/resetPassword", {
    error: "Password must be at least 5 characters long",
  });
});

test("Current Password does not match db entry", async () => {
  // Need to stub data temporarily - need user session data for request object
  const req = {
    body: {
      CurrentPassword: "testUser1",
      NewPassword1: "password",
      NewPassword2: "password",
    },
    session: {
      user: {
        username: "testUser1",
        email: "testEmail@email.com",
      },
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
      password: "wrongPassword",
    });
  });

  await changePassword(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/resetPassword", {
    error: "Current password is incorrect",
  });
});
