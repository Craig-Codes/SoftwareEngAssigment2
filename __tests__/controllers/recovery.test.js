const { recoveryNavigatorController } = require("../../controllers/recovery");

const req = {};

const res = {
  render: jest.fn(),
};

test("Recovery renders", () => {
  recoveryNavigatorController(req, res);
  expect(res.render).toHaveBeenCalledWith("recovery");
});
