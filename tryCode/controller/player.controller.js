const playerModel = require("../model/player.model");
const response = require("../responese");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await playerModel.findAll();
      response(200, data, "data ditemukan", res, null, null, data.length);
    } catch (error) {
      response(400, null, error.message, res, null, null, null);
    }
  },
  getOneById: async (req, res) => {
    try {
      const id = +req.params.id;
      const dataPlayer = await playerModel.findOne({
        where: { id },
      });
      if (!dataPlayer) throw new Error("data tidak ditemukan");

      response(200, dataPlayer, "data ditemukan", res, null, null, null);
    } catch (error) {
      response(400, null, error.message, res, null, null, null);
    }
  },
  create: async (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const position = req.body.position;
    const club = req.body.club;
    const number = req.body.number;

    if (!name || !age || !position || !club || !number)
      throw new Error("data tidak ditemukan");
    if (
      name === "" ||
      age === "" ||
      position === "" ||
      club === "" ||
      number === ""
    )
      throw new Error("data tidak boleh kosong");

    try {
      const dataPlayer = await playerModel.create({
        name,
        age,
        position,
        club,
        number,
      });

      response(200, dataPlayer, "data ditemukan", res, null, null, null);
    } catch (error) {
      response(400, null, error.message, res, null, null, null);
    }
  },
  update: async (req, res) => {
    try {
      const id = +req.params.id; // Ambil id dari parameter rute
      const { name, age, position, club, number } = req.body;

      const dataPlayer = await playerModel.findOne({ where: { id } });

      if (!dataPlayer) throw new Error("data tidak ditemukan");

      // Hanya perbarui kolom yang ada di body
      const updatedFields = {};
      if (name !== undefined) updatedFields.name = name;
      if (age !== undefined) updatedFields.age = age;
      if (position !== undefined) updatedFields.position = position;
      if (club !== undefined) updatedFields.club = club;
      if (number !== undefined) updatedFields.number = number;

      await playerModel.update(updatedFields, { where: { id } });
      const updatedPlayer = await playerModel.findOne({ where: { id } });

      response(200, updatedPlayer, "data ditemukan", res, null, null, null);
    } catch (error) {
      response(400, null, error.message, res, null, null, null);
    }
  },

  delete: async (req, res) => {
    try {
      const id = +req.params.id; // Ambil id dari parameter rute

      const findPlayer = await playerModel.findOne({ where: { id } });
      if (!findPlayer) throw new Error("data not found");

      await findPlayer.destroy();
      response(200, null, "data deleted", res, null, null, null);
    } catch (error) {
      response(400, null, error.message, res, null, null, null);
    }
  },
};
