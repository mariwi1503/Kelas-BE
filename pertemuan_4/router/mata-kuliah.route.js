const router = require("express").Router();

router.get("/mata-kuliah", (req, res) => {
  res.send("MATA KULIAH");
});

module.exports = router;
