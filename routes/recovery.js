const express = require("express");
const router = express.Router();
const {
  recoveryNavigatorController,
  recoveryPostController,
} = require("../controllers/recovery");

router.get("/", recoveryNavigatorController);

router.post("/", recoveryPostController);

module.exports = router;
