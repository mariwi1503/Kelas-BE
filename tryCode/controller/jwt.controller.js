const jwtModel = require("../model/jwt.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Jwt = require("../model/jwt.model");
const { getAll, getOneById } = require("./player.controller");
const secretKey = process.env.JWT_SECRET;

module.exports = {
  getAll: async (req, res) => {
    try {
      const dataJwt = await jwtModel.findAll();
      res.status(200).json({
        status: "success",
        data: dataJwt,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  getOneById: async (req, res) => {
    try {
      id: req.params.id;

      const jwtId = await Jwt.findOne({ where: { id } });
      res.status(200).json({
        status: "success",
        data: jwtId,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
