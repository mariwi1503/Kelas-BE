import { Sequelize } from "sequelize";

const db = new Sequelize("playerFootball", "postgres", "postgres", {
  dialect: "postgres",
  host: "localhost",
  logging: false,
});

//autentication
db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

//check database
db.sync({ alter: true, force: false });

export default db;
