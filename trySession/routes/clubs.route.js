import clubsController from "../controllers/clubs.controller.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/", authMiddleware, clubsController.getAllClubs);
router.get("/:id", authMiddleware, clubsController.getClubById);
router.post("/", authMiddleware, clubsController.create);
router.put("/:id", authMiddleware, clubsController.update);
router.post("/:id", authMiddleware, clubsController.delete);

export default router;
