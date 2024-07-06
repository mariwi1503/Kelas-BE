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

const userController = {
  getAllUsers: (req, res) => {
    res.json({
      status: "success",
      data: users,
    });
  },

  getOne: (req, res) => {
    const name = req.params.name;
    const user = users.find((x) => x.name == name);
    res.json({
      status: "success",
      data: user,
    });
  },

  create: (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    users.push({
      name: name,
      age: age,
    });
    res.json({
      status: "success",
      data: users,
    });
  },

  update: (req, res) => {
    const name = req.params.name;
    const age = req.params.age;
    users = users.map((x) => {
      if (x.name == name) {
        x.age = age;
      }
      return x;
    });
    res.json({
      status: "success",
      data: users,
    });
  },

  delete: (req, res) => {
    const name = req.params.name;
    users = users.filter((x) => x.name != name);
    res.json({
      status: "success",
      data: users,
    });
  },
};

module.exports = userController;
