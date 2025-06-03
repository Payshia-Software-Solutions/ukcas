const { Payment, Institute } = require("../models/index");

const paymentController = {
  // Create or merge a payment for the same institute and type
  async createPayment(req, res) {
    try {
      const {
        institute_id,
        description,
        amount,
        reference_id,
        type, // should be "topup" or "certificate_fee"
        created_by,
      } = req.body;

      if (!["topup", "certificate_fee"].includes(type)) {
        return res.status(400).json({ error: "Invalid payment type" });
      }

      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount)) {
        return res.status(400).json({ error: "Invalid amount" });
      }

      // Check if a similar existing payment exists (logic now excludes 'status')
      const existingPayment = await Payment.findOne({
        where: {
          institute_id,
          type,
        },
      });

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

      // Create a new payment
      const payment = await Payment.create({
        institute_id,
        description,
        amount: numericAmount,
        reference_id,
        type,
        created_by,
      });

      return res.status(201).json({
        message: "New payment created.",
        payment,
      });
    } catch (error) {
      console.error("Error creating payment:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get all payments
  async getAllPayments(req, res) {
    try {
      const payments = await Payment.findAll({
        include: [{ model: Institute }],
        order: [["created_at", "DESC"]],
      });
      res.json(payments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get one payment
  async getPaymentById(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id, {
        include: [{ model: Institute }],
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

  // Update payment (admin/system)
  async updatePayment(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      const {
        description,
        amount,
        reference_id,
        type,
        updated_by,
      } = req.body;

      await payment.update({
        description: description || payment.description,
        amount: amount || payment.amount,
        reference_id: reference_id || payment.reference_id,
        type: type || payment.type,
        updated_by,
      });

      res.json(payment);
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
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting payment:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = paymentController;
