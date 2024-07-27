const { Sequelize } = require("sequelize");
const db = require("../db.connection");

const User = db.define("User", {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: "Username sudah digunakan",
    },
    validate: {
      notEmpty: {
        msg: "Username tidak boleh kosong",
      },
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password tidak boleh kosong",
      },
    },
  },
});

module.exports = User;
