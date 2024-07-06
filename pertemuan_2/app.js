const express = require("express");
const app = express();
const userController = require("./controller/user.controller");
const postController = require("./controller/post.controller");

// untuk membaca req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// users
app.get("/users", userController.getAllUsers);
app.get("/users/:name", userController.getOne);
app.post("/add-user/:name/:age", userController.create);
app.put("/update-user/:name/:age", userController.update);
app.delete("/delete-user/:name", userController.delete);

// post
app.get("/posts", postController.getAll);
app.get("/posts/:id", postController.getOne);
app.post("/posts", postController.create);
app.put("/update-post/:id", postController.update);
app.delete("/delete-post/:id", postController.delete);

app.listen(3001, () => console.log("Server is listening at 3001"));

/**
 * TODO
 * 1. buat getOne, update dan delete post
 * 2. saat update user tidak boleh update IDnya
 * 3. terapin try catch untuk menangani error
 */
