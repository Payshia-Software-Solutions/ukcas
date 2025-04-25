const { AccrediteForm } = require("../models/index");

const accrediteFormController = {
  async createAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.create(req.body);
      res.status(201).json(accrediteForm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllAccrediteForms(req, res) {
    try {
      const accrediteForms = await AccrediteForm.findAll();
      res.json(accrediteForms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.findByPk(req.params.id);
      if (!accrediteForm) return res.status(404).json({ error: "AccrediteForm not found" });
      res.json(accrediteForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.findByPk(req.params.id);
      if (!accrediteForm) return res.status(404).json({ error: "AccrediteForm not found" });
      await accrediteForm.update(req.body);
      res.json(accrediteForm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.findByPk(req.params.id);
      if (!accrediteForm) return res.status(404).json({ error: "AccrediteForm not found" });
      await accrediteForm.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = accrediteFormController;
