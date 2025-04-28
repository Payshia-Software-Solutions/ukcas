const { Certificate, Student, Institute } = require("../models");
const { Op } = require("sequelize");

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

  // New search function for finding certificates by certificate_id
  async getCertificatesByCertificateId(req, res) {
    try {
      const { value } = req.query; // Get the search value from query params
      
      if (!value) {
        return res.status(400).json({ error: "Search value is required" });
      }
  
      // Search the database with the query logic
      const certificates = await Certificate.findAll({
        where: {
          certificate_id: { [Op.like]: `%${value}%` } // Search by certificate_id
        },
        include: [Student, Institute],
        limit: 5, // Limit to 5 results
      });
  
      if (certificates.length === 0) {
        return res.status(404).json({ error: "Certificate not found" });
      }
  
      res.json(certificates);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = certificateController;