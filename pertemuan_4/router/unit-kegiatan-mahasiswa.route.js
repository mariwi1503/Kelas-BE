const router = require("express").Router();
const ukmController = require("../controllers/unit-kegiatan-mahasiswa.controller");

router.post("/ukm", ukmController.create);
router.get("/ukm", ukmController.getAll);
router.get("/ukm/:id", ukmController.getOneById);
router.put("/ukm/:id", ukmController.update);
router.delete("/ukm/:id", ukmController.delete);

module.exports = router;
