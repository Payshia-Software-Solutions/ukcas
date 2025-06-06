const { Payment, Institute } = require("../models/index");

const paymentController = {
  // Create or merge a payment for the same institute and type
  async createPayment(req, res) {
    try {
      const {
        institute_id,
        description,
        amount,
        type,
        created_by,
      } = req.body;

      // Validate required fields
      if (!institute_id || !description || !amount || !type || !created_by) {
        return res.status(400).json({ 
          error: "Missing required fields: institute_id, description, amount, type, created_by" 
        });
      }

      // Validate payment type
      if (!["topup", "certificate_fee"].includes(type)) {
        return res.status(400).json({ error: "Invalid payment type" });
      }

      // Convert amount to a number
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ error: "Invalid amount. Must be a positive number." });
      }

      // Check if a similar existing payment exists
      const existingPayment = await Payment.findOne({
        where: {
          institute_id,
          type,
        },
      });

      // If payment exists, merge (add amount and update description)
      if (existingPayment) {
        existingPayment.amount += numericAmount;
        existingPayment.description = existingPayment.description
          ? `${existingPayment.description}; ${description}`
          : description;
        existingPayment.updated_by = created_by;
        await existingPayment.save();

        return res.status(200).json({
          message: "Payment updated by adding to existing record.",
          payment: existingPayment,
        });
      }

      // Generate reference_id manually using the static method
      const referenceId = await Payment.generateReferenceId();

      // Create a new payment record
      const payment = await Payment.create({
        institute_id,
        description,
        amount: numericAmount,
        type,
        created_by,
        reference_id: referenceId,
      });

      return res.status(201).json({
        message: "New payment created.",
        payment,
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      
      // Handle specific Sequelize errors
      if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({ 
          error: "Validation error", 
          details: error.errors.map(err => ({
            field: err.path,
            message: err.message
          }))
        });
      }
      
      if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ 
          error: "Duplicate reference ID. Please try again." 
        });
      }

      res.status(500).json({ error: "Internal server error" });
    }
  },

  // Get all payments
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.findAll({
        include: [{ model: Institute, required: false }], // Use LEFT JOIN instead of INNER JOIN
        order: [["created_at", "DESC"]],
      });
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get one payment by ID
  async getPaymentById(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id, {
        include: [{ model: Institute, required: false }],
      });

      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      res.json(payment);
    } catch (error) {
      console.error("Error fetching payment:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update a payment (admin/system)
  async updatePayment(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      const {
        description,
        amount,
        type,
        updated_by,
      } = req.body;

      // Validate amount if provided
      if (amount !== undefined) {
        const numericAmount = parseFloat(amount);
        if (isNaN(numericAmount) || numericAmount <= 0) {
          return res.status(400).json({ error: "Invalid amount. Must be a positive number." });
        }
      }

      // Validate type if provided
      if (type && !["topup", "certificate_fee"].includes(type)) {
        return res.status(400).json({ error: "Invalid payment type" });
      }

      // Update the payment record
      await payment.update({
        description: description || payment.description,
        amount: amount ? parseFloat(amount) : payment.amount,
        type: type || payment.type,
        updated_by: updated_by || payment.updated_by,
      });

      res.json({
        message: "Payment updated successfully",
        payment
      });
    } catch (error) {
      console.error("Error updating payment:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a payment
  async deletePayment(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      await payment.destroy();
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
      console.error("Error deleting payment:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
