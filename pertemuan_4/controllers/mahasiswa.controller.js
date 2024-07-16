const mahasiswaModel = require("../model/mahasiswa.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      const data = await mahasiswaModel.findAll();
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
      const mahasiswa = await mahasiswaModel.findOne({ where: { id } });
      res.status(200).json({
        status: "success",
        data: mahasiswa ?? null,
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
      const nim = req.body.nim;
      const kelas = req.body.kelas;
      const jenis_kelamin = req.body.jenis_kelamin;

      // cek kiriman dari user, jangan sampai ada yang kosong
      if (!nama || nama === "") throw new Error("Nama tidak boleh kosong");
      if (!nim || nim === "") throw new Error("Nim tidak boleh kosong");
      if (!kelas || kelas === "") throw new Error("Kelas tidak boleh kosong");
      if (!jenis_kelamin || jenis_kelamin === "")
        throw new Error("Jenis kelamin tidak boleh kosong");

      // cek dulu nim sudah terdaftar atau belum
      const nim_exist = await mahasiswaModel.findOne({ where: { nim } });
      if (nim_exist) throw new Error("NIM sudah terdaftar");

      // menyimpan data baru ke database
      await mahasiswaModel.create({ nama, nim, kelas, jenis_kelamin });

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
      const nim = req.body.nim;
      const kelas = req.body.kelas;
      const jenis_kelamin = req.body.jenis_kelamin;

      // cek data mahasiswa
      const mahasiswa = await mahasiswaModel.findOne({ where: { id } });
      if (!mahasiswa) throw new Error("Data tidak ditemukan");

      // update data mahasiswa
      await mahasiswaModel.update(
        { nama, nim, kelas, jenis_kelamin },
        { where: { id } }
      );

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

      // cek data mahasiswa
      const mahasiswa = await mahasiswaModel.findOne({ where: { id } });
      if (!mahasiswa) throw new Error("Data tidak ditemukan");

      // hapus data
      await mahasiswaModel.destroy({ where: { id } });

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
