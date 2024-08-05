import clubsModel from "../models/clubs.model.js";
import response from "../utils/response.js";

const clubsController = {
  getAllClubs: async (req, res) => {
    try {
      const data = await clubsModel.findAll();
      response.successResponse(200, data, "Success get all clubs", res);
    } catch (error) {
      response.errorResponse(500, "Internal server error", res, error);
    }
  },

  getClubById: async (req, res) => {
    try {
      const id = req.params.id;
      const clubId = await clubsModel.findOne({ where: { id } });

      if (!clubId) throw new Error("club tidak ditemukan");
      response.successResponse(200, clubId, "Success get club by id", res);
    } catch (error) {
      response.errorResponse(500, "club tidak ditemukan", res, error);
    }
  },
  create: async (req, res) => {
    const name = req.body.name;
    const trophiesUCL = req.body.trophiesUCL;
    const rank = req.body.rank;
    try {
      const data = await clubsModel.create({ name, trophiesUCL, rank });
      response.successResponse(201, data, "Success create new club", res);
    } catch (error) {
      response.errorResponse(500, "Internal server error", res, error);
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { name, trophiesUCL, rank } = req.body;

      const dataClub = await clubsModel.findOne({ where: { id } });
      if (!dataClub) throw new Error("club tidak ditemukan");

      const data = await clubsModel.update(
        { name, trophiesUCL, rank },
        { where: { id } }
      );
      response.successResponse(200, data, "Success update club", res);
    } catch (error) {
      response.errorResponse(400, error.message, res, error);
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteID = await clubsModel.findOne({ where: { id } });

      if (!deleteID) throw new Error("club tidak ditemukan");

      await clubsModel.destroy({ where: { id } });
      response.successResponse(200, deleteID, "Success delete club", res);
    } catch (error) {
      response.errorResponse(500, error.message, res, error);
    }
  },
};

export default clubsController;
