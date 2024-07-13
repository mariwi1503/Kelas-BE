const router = require('express').Router()
const userController = require('../controller/user.controller')

// users
router.get("/users", userController.getAllUsers);
router.get("/users/:name", userController.getOne);
router.post("/add-user/:name/:age", userController.create);
router.put("/update-user/:name/:age", userController.update);
router.delete("/delete-user/:name", userController.delete);

module.exports = router