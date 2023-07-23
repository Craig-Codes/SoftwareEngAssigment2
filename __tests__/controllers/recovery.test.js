const {
  recoveryNavigatorController,
  recoveryPostController,
} = require("../../controllers/recovery");

const req = {};

const res = {
  render: jest.fn(),
};

test("Recovery renders", () => {
  recoveryNavigatorController(req, res);
  expect(res.render).toHaveBeenCalledWith("recovery");
});

test("Recovery no input", async () => {
  // Stub data
  const req = {
    body: {
      Email: "",
    },
  };

  await recoveryPostController(req, res);
  expect(res.render).toHaveBeenCalledWith("../views/recovery", {
    error: "Email address is required",
  });
});
