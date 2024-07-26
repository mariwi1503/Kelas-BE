const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/user.model");
const secretKey = process.env.JWT_SECRET;

const authController = {
  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        throw new Error("Username dan password harus diisi");
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ username, password: hashedPassword });

      // Buat token JWT
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });

      res.status(201).json({
        status: "success",
        data: { user, token },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
        details: error.errors ? error.errors.map((e) => e.message) : null, // Detail error
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({
        status: "success",
        data: { token },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  },
};

module.exports = authController;
