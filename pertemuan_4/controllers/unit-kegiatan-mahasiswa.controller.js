const ukmModel = require("../model/unit-kegiatan-mahasiswa.model");
const { getAll, getOneById } = require("./mahasiswa.controller");

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
  getOneById: async (req, res) => {
    try {
      const id = +req.params.id;
      const ukm = await ukmModel.findOne({ where: { id } });
      res.status(200).json({
        status: "success",
        data: ukm ?? null,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  create: async (req, res) => {
    try {
      const nama = req.body.nama;
      const tentang = req.body.tentang;
      const jumlah = req.body.jumlah;

      if (!nama || nama === "") throw new Error("Nama tidak boleh kosong");
      if (!tentang || tentang === "")
        throw new Error("Tentang tidak boleh kosong");
      if (!jumlah || jumlah === "")
        throw new Error("Jumlah tidak boleh kosong");

      await ukmModel.create({ nama, tentang, jumlah });
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(404).json({
        status: "failed",
        message: error.message,
      });
    }
  },

  update: async (req, res) => {
    try {
      const id = +req.params.id;

      const nama = req.body.nama;
      const tentang = req.body.tentang;
      const jumlah = req.body.jumlah;

      // cek data ukmUpdate
      const ukmUpdate = await ukmModel.findOne({ where: { id } });
      if (!ukmUpdate) throw new Error("Data tidak ditemukan");

      // update data ukmUpdate
      await ukmModel.update({ nama, tentang, jumlah }, { where: { id } });

      // kirim response berhasil ke user
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = +req.params.id;

      // cek data mataKuliah
      const ukmDelete = await ukmModel.findOne({ where: { id } });
      if (!ukmDelete) throw new Error("Data tidak ditemukan");

      // hapus data
      await ukmModel.destroy({ where: { id } });

      // kirim response berhasil ke user
      res.status(200).json({
        status: "success",
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
};
