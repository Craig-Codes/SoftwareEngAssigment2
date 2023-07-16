// test that the dashboard renders with the correct session parameters

const { dashboardNavigatorController } = require("../../controllers/dashboard");

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

test("dashboard renders", () => {
  dashboardNavigatorController(request, res);
  expect(res.render).toHaveBeenCalledWith("dashboard", {
    username: request.session.user.username,
    email: request.session.user.email,
  });
});
