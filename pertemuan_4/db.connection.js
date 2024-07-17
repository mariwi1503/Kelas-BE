const { Sequelize } = require("sequelize");

const db = new Sequelize("mahasiswa", "postgres", "postgres", {
  host: `localhost`,
  dialect: "postgres",
  logging: false,
});

// test koneksi
db.authenticate()
  .then(() => console.log("Database connected!"))
  .catch(() => console.log("Connection failed!"));

// sinkronisasi
db.sync({ alter: true, force: false });

module.exports = db;
