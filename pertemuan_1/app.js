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
  if (!user) {
    res.status(404).json({
      status: "Not Found",
      message: "User not found",
    });
  } else {
    res.json({
      status: "OK",
      data: user,
    });
  }
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
  let userUpdated = false;

  users = users.map((x) => {
    if (x.name === name) {
      x.age = parseInt(age);
      userUpdated = true;
    }
    return x;
  });

  if (userUpdated) {
    res.json({
      status: "OK",
      message: `User '${name}' has been successfully updated.`,
      data: users,
    });
  } else {
    res.status(404).json({
      status: "Not Found",
      message: `User '${name}' not found.`,
    });
  }
});

// hapus user
app.delete("/delete-user/:name", (req, res) => {
  const deletedUserName = req.params.name;
  const updatedUsers = users.filter(({ name }) => name !== deletedUserName);

  if (updatedUsers.length < users.length) {
    res.json({
      status: "OK",
      message: `User '${deletedUserName}' has been successfully deleted.`,
      data: updatedUsers,
    });
  } else {
    // User not found
    res.status(404).json({
      status: "Not Found",
      message: `User '${deletedUserName}' not found.`,
    });
  }
});

app.listen(3000, () => console.log("Server is listening..."));
