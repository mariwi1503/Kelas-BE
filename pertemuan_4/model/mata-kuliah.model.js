const { Sequelize } = require("sequelize");
const db = require("../db.connection");

const MataKuliah = db.define(
  "mata-kuliah",
  {
    nama: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dosen: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sks: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = MataKuliah;
