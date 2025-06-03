const { AccrediteForm, Institute } = require("../models/index");

const accrediteFormController = {
  // ✅ Create a new accredite form AND add it to institute table
  async createAccrediteForm(req, res) {
    try {
      // Step 1: Save form entry
      const accrediteForm = await AccrediteForm.create(req.body);

      // Step 2: Extract values from request body
      const {
        name,
        address_line_1,
        address_line_2,
        phone_number,
        mini_description_of_instit
      } = req.body;

      const combinedAddress = `${address_line_1}, ${address_line_2}`;
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

      // Step 3: Save to institute table
      await Institute.create({
        name,
        slug,
        address: combinedAddress,
        mobile_number: phone_number,
        img_url: "", // default or optional
        description: "", // optional
        mini_description: mini_description_of_instit || "",
        terms_and_conditions: "Auto-generated from accreditation form",
        created_by: "system",
        updated_by: "system"
      });

      res.status(201).json({
        message: "Accreditation form and Institute saved successfully",
        data: accrediteForm
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // 🔁 Get all accredite forms
  async getAllAccrediteForms(req, res) {
    try {
      const accrediteForms = await AccrediteForm.findAll();
      res.json(accrediteForms);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 🔁 Get a single accredite form by ID
  async getAccrediteForm(req, res) {
    try {
      const accrediteForm = await AccrediteForm.findByPk(req.params.id);
      if (!accrediteForm) return res.status(404).json({ error: "AccrediteForm not found" });
      res.json(accrediteForm);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // 🔁 Update entire accredite form
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

  // 🔁 Delete accredite form
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

  // 🔁 Update status of accredite form
  async updateAccrediteStatus(req, res) {
    const { id, status } = req.body;

    try {
      const accrediteForm = await AccrediteForm.findByPk(id);
      if (!accrediteForm) {
        return res.status(404).json({ error: "AccrediteForm not found" });
      }

      accrediteForm.accredite_status = status || "active";
      accrediteForm.updated_by = req.body.updated_by || null;
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
