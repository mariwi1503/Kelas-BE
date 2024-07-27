const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");

router.get("/list", authController.getAll);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
