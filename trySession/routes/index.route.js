import express from "express";
import authRoute from "./auth.route.js";
import clubsRoute from "./clubs.route.js";

const router = express.Router();

// main route
router.get("/", (req, res) => {
  res.render("index");
});

// route for auth
router.use("/", authRoute);

// route for clubs
router.use("/clubs", clubsRoute);

//route for lost
router.use("*", (req, res) => {
  res.send("page not found");
});

export default router;
