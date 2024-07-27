const jwtController = require("../controller/jwt.controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/jwt", authMiddleware, jwtController.getAll);
router.get("/jwt/:id", authMiddleware, jwtController.getOneById);

module.exports = router;
