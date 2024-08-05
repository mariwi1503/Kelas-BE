import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize";
import db from "./db.connection.js";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import allRoute from "./routes/index.route.js";

//app
const app = express();

//konfigurasi session store
const SequelizeStore = connectSessionSequelize(session.Store);

const store = new SequelizeStore({
  db: db,
});

// Inisialisasi store terlebih dahulu sebelum app.use(session)
store.sync();

app.use(
  session({
    secret: process.env.SESSION_SECRET || "12ser324",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: false, // Set true jika menggunakan HTTPS
    },
  })
);

//setting
app.set("view engine", "ejs");
app.set(
  "views",
  path.join(path.dirname(fileURLToPath(import.meta.url)), "views")
);

//middleware
app.use(
  express.static(
    path.join(path.dirname(fileURLToPath(import.meta.url)), "public")
  )
);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//path
app.use("/", allRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server is running on port http://localhost:${port}`);
});
