const { Certificate, Student, Payment } = require("../models");
const { Op } = require("sequelize");

const certificateController = {
  // Create a new certificate and deduct payment
  async createCertificate(req, res) {
    try {
      const {
        student_id,
        certificate_id,
        student_name_initial,
        issued_date,
        student_name_full,
        email,
        student_grade,
        organization,
        created_by,
      } = req.body;

      // Get student to determine institute_id
      const student = await Student.findByPk(student_id);
      if (!student) {
        return res.status(404).json({ error: "Student not found" });
      }

      // Check topup balance for the student's institute
      const topupPayment = await Payment.findOne({
        where: {
          institute_id: student.institute_id,
          type: "topup",
        },
      });

      if (!topupPayment || parseFloat(topupPayment.amount) < 10) {
        return res.status(400).json({ error: "Insufficient topup balance to issue certificate" });
      }

      // Deduct 10 from topup balance
      topupPayment.amount -= 10;
      await topupPayment.save();

      // Create the certificate
      const certificate = await Certificate.create({
        student_id,
        certificate_id,
        student_name_initial,
        issued_date,
        student_name_full,
        email,
        student_grade,
        organization,
        created_by,
      });

      res.status(201).json({
        message: "Certificate issued and ₨10 deducted from topup balance.",
        certificate,
      });
    } catch (error) {
      console.error("Error creating certificate:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get all certificates with related Student data
  async getAllCertificates(req, res) {
    try {
      const certificates = await Certificate.findAll({
        include: [{ model: Student }],
      });
      res.json(certificates);
    } catch (error) {
      console.error("Error fetching certificates:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific certificate by ID
  async getCertificate(req, res) {
    try {
      const certificate = await Certificate.findByPk(req.params.id, {
        include: [{ model: Student }],
      });
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      res.json(certificate);
    } catch (error) {
      console.error("Error fetching certificate:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update certificate
  async updateCertificate(req, res) {
    try {
      const certificate = await Certificate.findByPk(req.params.id);
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }

      const updatedData = {
        student_id: req.body.student_id || certificate.student_id,
        certificate_id: req.body.certificate_id || certificate.certificate_id,
        student_name_initial: req.body.student_name_initial || certificate.student_name_initial,
        issued_date: req.body.issued_date || certificate.issued_date,
        student_name_full: req.body.student_name_full || certificate.student_name_full,
        email: req.body.email || certificate.email,
        student_grade: req.body.student_grade || certificate.student_grade,
        organization: req.body.organization || certificate.organization,
        created_by: req.body.created_by || certificate.created_by,
      };

      await certificate.update(updatedData);
      res.json(certificate);
    } catch (error) {
      console.error("Error updating certificate:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a certificate
  async deleteCertificate(req, res) {
    try {
      const certificate = await Certificate.findByPk(req.params.id);
      if (!certificate) {
        return res.status(404).json({ error: "Certificate not found" });
      }
      await certificate.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting certificate:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Search certificates by ID
  async getCertificatesByCertificateId(req, res) {
    try {
      const { value } = req.query;

      if (!value) {
        return res.status(400).json({ error: "Search value is required" });
      }

      const certificates = await Certificate.findAll({
        where: {
          certificate_id: { [Op.like]: `%${value}%` },
        },
        include: [{ model: Student }],
        limit: 5,
      });

      if (certificates.length === 0) {
        return res.status(404).json({ error: "Certificate not found" });
      }

      res.json(certificates);
    } catch (error) {
      console.error("Error searching certificates:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = certificateController;
