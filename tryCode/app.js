require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const morgan = require("morgan");
const allRoute = require("./routes/index.route");

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set EJS sebagai view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Set folder public untuk static files
app.use(express.static(path.join(__dirname, "public")));

//path
app.use("/", allRoute);

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Listening on port ${port}`));
