const mataKuliahModel = require("../model/mata-kuliah.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await mataKuliahModel.findAll();
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (error) {
      res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  },
  getOneById: async (req, res) => {
    try {
      const id = +req.params.id;
      const mataKuliah = await mataKuliahModel.findOne({ where: { id } });
      res.status(200).json({
        status: "success",
        data: mataKuliah ?? null,
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
      const dosen = req.body.dosen;
      const sks = req.body.sks;

      // cek kiriman dari user, jangan sampai ada yang kosong
      if (!nama || nama === "") throw new Error("Nama tidak boleh kosong");
      if (!dosen || dosen === "") throw new Error("Dosen tidak boleh kosong");
      if (!sks || sks === "") throw new Error("Sks tidak boleh kosong");

      // menyimpan data baru ke database
      await mataKuliahModel.create({ nama, dosen, sks });

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
  update: async (req, res) => {
    try {
      const id = +req.params.id;

      const nama = req.body.nama;
      const dosen = req.body.dosen;
      const sks = req.body.sks;

      // cek data mataKuliah
      const mataKuliah = await mataKuliahModel.findOne({ where: { id } });
      if (!mataKuliah) throw new Error("Data tidak ditemukan");

      // update data mataKuliah
      await mataKuliahModel.update({ nama, dosen, sks }, { where: { id } });

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
      const mataKuliah = await mataKuliahModel.findOne({ where: { id } });
      if (!mataKuliah) throw new Error("Data tidak ditemukan");

      // hapus data
      await mataKuliahModel.destroy({ where: { id } });

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
