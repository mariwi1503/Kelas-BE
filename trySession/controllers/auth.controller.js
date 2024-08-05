import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import response from "../utils/response.js";
import { loginSchema, registerSchema } from "../validations/authValidator.js";

const authController = {
  register: async (req, res) => {
    try {
      // Validasi request body
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      const { username, password } = req.body;

      // Cek jika username sudah ada
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res
          .status(400)
          .json({ status: "error", message: "Username sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await authModel.create({
        username,
        password: hashedPassword,
      });

      response.successResponse(201, newUser, "Success create new user", res);
    } catch (error) {
      response.errorResponse(400, error.message, res, error);
    }
  },
  login: async (req, res) => {
    try {
      const { error } = loginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          status: "error",
          message: error.details[0].message,
        });
      }

      const { username, password } = req.body;

      //validasi
      if (!username || !password)
        throw new Error("username dan password harus diisi");

      //auth username
      const user = await authModel.findOne({ where: { username } });
      if (!user) throw new Error("username tidak ditemukan");

      //auth password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("password tidak sesuai");

      //menyimpan session
      req.session.userId = user.id;
      req.session.username = user.username;

      response.successResponse(200, user, "Success login", res);
    } catch (error) {
      response.errorResponse(400, error.message, res, error);
    }
  },
  logout: async (req, res) => {
    try {
      req.session.destroy();
      response.successResponse(200, null, "Success logout", res);
    } catch (error) {
      response.errorResponse(400, error.message, res, error);
    }
  },
};

export default authController;
