const ukmModel = require("../model/unit-kegiatan-mahasiswa.model");
const { getAll } = require("./mahasiswa.controller");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await ukmModel.findAll();
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
