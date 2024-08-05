import {Sequelize} from 'sequelize'
import db from "../db.connection.js";

const Clubs = db.define("club", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    trophiesUCL: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    rank: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

export default Clubs