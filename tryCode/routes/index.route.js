const express = require("express");
const router = express.Router();
const authRouth = require("./auth.route");
const playerRoute = require("./player.route");

//main route
router.get("/", (req, res) => {
  res.render("index");
});

// login and register
router.use("/auth", authRouth);

///players route
router.use("/api/player", playerRoute);

//lost route
router.use("*", (req, res) => {
  res.status(404).send("cari apa boss ku?");
});

module.exports = router;
