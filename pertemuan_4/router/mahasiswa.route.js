const router = require("express").Router();
const mahasiswaController = require("../controllers/mahasiswa.controller");

router.post("/mahasiswa", mahasiswaController.create);
router.get("/mahasiswa", mahasiswaController.getAll);
router.get("/mahasiswa/:id", mahasiswaController.getOneById);
router.put("/mahasiswa/:id", mahasiswaController.update);
router.delete("/mahasiswa/:id", mahasiswaController.delete);

module.exports = router;
