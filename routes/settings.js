var express = require("express");
var router = express.Router();
const {
  settingsNavigationController,
  logoutUser,
  passwordNavigationController,
  changePassword,
} = require("../controllers/settings");

router.get("/", settingsNavigationController);

router.get("/password", passwordNavigationController);

router.post("/password", changePassword);

router.post("/logout", logoutUser);

module.exports = router;
