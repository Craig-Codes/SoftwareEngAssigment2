// test that the dashboard renders with the correct session parameters

const {
  settingsNavigationController,
  passwordNavigationController,
} = require("../../controllers/settings");

// Need to stub data temporarily - need user session data for request object
const request = {
  session: {
    user: {
      username: "testUser",
      email: "testEmail@email.com",
    },
  },
};

const res = {
  render: jest.fn(),
};

// Settings page renders
test("settings renders", () => {
  settingsNavigationController(request, res);
  expect(res.render).toHaveBeenCalledWith("settings", {
    username: request.session.user.username,
    email: request.session.user.email,
  });
});

// Password reset page renders
test("password change renders", () => {
  passwordNavigationController(request, res);
  expect(res.render).toHaveBeenCalledWith("resetPassword", {
    username: request.session.user.username,
    email: request.session.user.email,
  });
});
