const router = require("express").Router();
const mataKuliahController = require("../controllers/mata-kuliah.controller.js");

router.post("/mata-kuliah", mataKuliahController.create);
router.get("/mata-kuliah", mataKuliahController.getAll);
router.get("/mata-kuliah/:id", mataKuliahController.getOneById);
router.put("/mata-kuliah/:id", mataKuliahController.update);
router.delete("/mata-kuliah/:id", mataKuliahController.delete);

module.exports = router;
