const router = require('express').Router()
const postController = require('../controller/post.controller')

router.get("/posts", postController.getAll);
router.post("/posts", postController.create);
router.get("/posts/:id", postController.getOne);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);

module.exports = router