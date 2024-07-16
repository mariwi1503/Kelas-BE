const express = require("express");
const morgan = require("morgan");
const mahasiswaRoute = require("./router/mahasiswa.route");
const matkulRoute = require("./router/mata-kuliah.route");

const port = process.env.PORT || 3000;
const app = express();

app.use(morgan("dev"));

app.use(express.json());

// daftar api
app.use("/api", mahasiswaRoute, matkulRoute);

// biasa juga disebut api healt, fungsi utamanya untuk cek api kita sudah jalan atau belum
app.get("/", (req, res) => {
  res.send("HELLO BRE");
});

// menangani kalau user sembarang hit url
app.all("*", (req, res) => {
  res.send("CARI APA BRE?");
});

app.listen(port, () => {
  console.log("Server berjalan di port:", port);
});

// TODO = tambah CRUD untuk mata kuliah
