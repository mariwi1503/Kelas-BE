const express = require("express");
const app = express();

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

app.get("/users", (req, res) => {
  res.json({
    status: "OK",
    data: users,
  });
});

app.get("/users/:name", (req, res) => {
  const name = req.params.name;
  const user = users.find((x) => x.name == name);
  res.json({
    status: "OK",
    data: user,
  });
});

// TODO =
// tambah user
app.post("/add-user/:name/:age", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  users.push({
    name: name,
    age: age,
  });
  res.json({
    status: "OK",
    data: users,
  });
});

// update user
app.put("/update-user/:name/:age", (req, res) => {
  const name = req.params.name;
  const age = req.params.age;
  users = users.map((x) => {
    if (x.name == name) {
      x.age = age;
    }
    return x;
  });
  res.json({
    status: "OK",
    data: users,
  });
});

// hapus user
app.delete("/delete-user/:name", (req, res) => {
  const name = req.params.name;
  users = users.filter((x) => x.name != name);
  res.json({
    status: "OK",
    data: users,
  });
});

app.listen(3000, () => console.log("Server is listening..."));
