const { sequelize, Sequelize } = require("sequelize");
const db = require("../db.connection");

const UnitKegiatanMahasiswa = db.define("unit-kegiatan-mahasiswa", {
  nama: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  tentang: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  jumlah: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = UnitKegiatanMahasiswa;
