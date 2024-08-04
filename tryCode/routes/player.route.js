const playerCont = require("../controller/player.controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, playerCont.getAll);
router.get("/:id", authMiddleware, playerCont.getOneById);
router.post("/", authMiddleware, playerCont.create);
router.put("/:id", authMiddleware, playerCont.update);
router.delete("/:id", authMiddleware, playerCont.delete);

module.exports = router;
