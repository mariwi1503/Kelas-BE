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

      res.status(201).json({
        status: "success",
        data: { user },
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
        details: error.errors ? error.errors.map((e) => e.message) : null,
      });
    }
  },

  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      // Validasi username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }

      // Validasi password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // Buat token
      const token = jwt.sign({ userId: user.id }, secretKey, {
        expiresIn: "1h",
      });

      // Kirim token ke cookies
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Ganti menjadi true jika menggunakan HTTPS
        sameSite: "strict",
      });

      return res.status(200).json({
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

  getUser: async (req, res) => {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error("No token provided");
      }

      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          throw new Error("Failed to authenticate token");
        }

        return res.status(200).json({ username: decoded.username });
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  logout: async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  },

  getAll: async (req, res) => {
    try {
      const allMember = await User.findAll();
      res.status(200).json({
        status: "success",
        data: allMember,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};

module.exports = authController;
