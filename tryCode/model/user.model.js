const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("playerFootball", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been successfully in database for user.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize.sync({ alter: true, force: false });

const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'Username sudah digunakan',
      },
      validate: {
        notEmpty: {
          msg: 'Username tidak boleh kosong',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password tidak boleh kosong',
        },
      },
    },
  });
  
module.exports = User;
