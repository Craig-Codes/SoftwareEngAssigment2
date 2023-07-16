const express = require("express");
const router = express.Router();
const { dashboardNavigatorController } = require("../controllers/dashboard");

router.get("/", dashboardNavigatorController);

module.exports = router;
