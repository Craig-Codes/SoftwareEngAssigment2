const express = require("express");
const router = express.Router();

const {
  registerNavigationController,
  registerPostController,
} = require("../controllers/register");

router.get("/", registerNavigationController);

router.post("/", registerPostController);

module.exports = router;
