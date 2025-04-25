const { Curriculum } = require("../models/index");

const curriculumController = {
  async createCurriculum(req, res) {
    try {
      const curriculum = await Curriculum.create(req.body);
      res.status(201).json(curriculum);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllCurriculums(req, res) {
    try {
      const curriculums = await Curriculum.findAll();
      res.json(curriculums);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCurriculum(req, res) {
    try {
      const curriculum = await Curriculum.findByPk(req.params.id);
      if (!curriculum) return res.status(404).json({ error: "Curriculum not found" });
      res.json(curriculum);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCurriculum(req, res) {
    try {
      const curriculum = await Curriculum.findByPk(req.params.id);
      if (!curriculum) return res.status(404).json({ error: "Curriculum not found" });
      await curriculum.update(req.body);
      res.json(curriculum);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteCurriculum(req, res) {
    try {
      const curriculum = await Curriculum.findByPk(req.params.id);
      if (!curriculum) return res.status(404).json({ error: "Curriculum not found" });
      await curriculum.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = curriculumController;
