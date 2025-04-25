const { Certificate, Student, Institute } = require("../models");

const certificateController = {
  async createCertificate(req, res) {
    try {
      const certificate = await Certificate.create(req.body);
      res.status(201).json(certificate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllCertificates(req, res) {
    try {
      const certificates = await Certificate.findAll({
        include: [Student, Institute],
      });
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCertificate(req, res) {
    try {
      const certificate = await Certificate.findByPk(req.params.id, {
        include: [Student, Institute],
      });
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      res.json(certificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateCertificate(req, res) {
    try {
      const certificate = await Certificate.findByPk(req.params.id);
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      await certificate.update(req.body);
      res.json(certificate);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteCertificate(req, res) {
    try {
      const certificate = await Certificate.findByPk(req.params.id);
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      await certificate.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = certificateController;
