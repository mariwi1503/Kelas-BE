const {Sequelize} = require("sequelize");
const db = require("../db.connection");

const Jwt = db.define('Jwt', {
    token: {
        type: Sequelize.toString,
        allowNull: false
    },
    secretKey: {
        type: Sequelize.STRING,
        allowNull: false
    }

})

module.exports = Jwt