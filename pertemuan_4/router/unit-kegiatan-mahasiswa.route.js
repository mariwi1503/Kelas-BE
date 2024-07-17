const router = require("express").Router();
const ukmController = require("../controllers/unit-kegiatan-mahasiswa.controller");

router.get("/ukm", ukmController.getAll);

module.exports = router;
