const { AccrediteForm } = require("../models/index");

const accrediteFormController = {
  // Create a new accredite form
  async createAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.create(req.body);
      res.status(201).json(accrediteForm);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all accredite forms
  async getAllAccrediteForms(req, res) {
    try {
      const accrediteForms = await AccrediteForm.findAll();
      res.json(accrediteForms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single accredite form by ID
  async getAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.findByPk(req.params.id);
      if (!accrediteForm) return res.status(404).json({ error: "AccrediteForm not found" });
      res.json(accrediteForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an entire accredite form by ID
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

  // Delete an accredite form by ID
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

  // ✅ NEW: Update only the status of an accredite form
  async updateAccrediteStatus(req, res) {
    const { id, status } = req.body;

    try {
      const accrediteForm = await AccrediteForm.findByPk(id);
      if (!accrediteForm) {
        return res.status(404).json({ error: "AccrediteForm not found" });
      }

      accrediteForm.accredite_status = status || "active"; // Default to 'active' if no status sent
      accrediteForm.updated_by = req.body.updated_by || null; // Optional: Track who updated it
      await accrediteForm.save();

      res.json({
        message: "Status updated successfully",
        data: accrediteForm,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = accrediteFormController;
