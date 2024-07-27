require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const playerRoute = require("./router/player.route");
const authRouter = require("./router/auth.route");
const jwtRouter = require("./router/jwt.route");

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("halo brothers");
});

//api
app.use("/api", playerRoute);

//auth
app.use("/auth", authRouter);
app.get("/", authRouter);
app.use("/jwt", jwtRouter);

//global
app.all("*", (req, res) => {
  res.send("cari apa boss ku?");
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));
