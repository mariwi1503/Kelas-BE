const { Sequelize } = require("sequelize");
const db = require("../db.connection");

const Mahasiswa = db.define(
  "mahasiswa",
  {
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nim: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Menjadikan kolom unik (tidak boleh sama)
    },
    kelas: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    jenis_kelamin: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = Mahasiswa;
