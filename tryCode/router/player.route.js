const playerCont = require("../controller/player.controller");
const router = require("express").Router();
const authMiddleware  =  require("../middleware/authMiddleware");

router.get("/player", authMiddleware, playerCont.getAll);
router.get("/player/:id", authMiddleware, playerCont.getOneById);
router.post("/player", authMiddleware, playerCont.create);
router.put("/player/:id", authMiddleware, playerCont.update);
router.delete("/player/:id", authMiddleware, playerCont.delete);

module.exports = router;
