const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public")); //to add an CSS file in public folder
let users = [
  {
    name: "agus",
    age: 25,
  },
  {
    name: "dodo",
    age: 22,
  },
  {
    name: "irfan",
    age: 23,
  },
];

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    data: users,
  });
});

app.get("/users", (req, res) => {
  res.json({
    status: "OK",
    data: users,
  });
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name;
  const user = users.find((u) => u.name === name);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("users not found");
  }
});

// tambah user
app.post("/users", (req, res) => {
  console.log(req.body);
  const { name, age } = req.body;
  const newUsers = {
    name: name,
    age: age,
  };
  users.push(newUsers);
  res.json({
    status: "OK",
    data: users,
  });
});

// hapus user
app.delete("/users/:name", (req, res) => {
  const name = req.params.name;
  const user = users.find((x) => x.name == name);
  console.log(user);
  const deleteUser = users.filter((x) => x.name !== name);
  if (!user) {
    res.json({
      status: `no ${name} found`,
    });
  } else {
    res.json({
      status: "OK",
      data: deleteUser,
    });
  }
});

app.listen(3000, () => console.log("Server is listening at 3000"));
