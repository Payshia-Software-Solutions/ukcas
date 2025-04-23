const { Institute } = require("../models/index");

const instituteController = {
  async createInstitute(req, res) {
    try {
      const institute = await Institute.create(req.body);
      res.status(201).json(institute);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllInstitutes(req, res) {
    try {
      const institutes = await Institute.findAll();
      res.json(institutes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getInstitute(req, res) {
    try {
      const institute = await Institute.findByPk(req.params.id);
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      res.json(institute);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateInstitute(req, res) {
    try {
      const institute = await Institute.findByPk(req.params.id);
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      await institute.update(req.body);
      res.json(institute);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteInstitute(req, res) {
    try {
      const institute = await Institute.findByPk(req.params.id);
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      await institute.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = instituteController;
