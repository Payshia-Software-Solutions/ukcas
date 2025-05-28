const { Payment, Institute } = require("../models/index");

const paymentController = {
  // Create or update a payment for same institute
  async createPayment(req, res) {
    try {
      const {
        institute_id,
        description,
        amount,
        status,        // "Paid" or "Unpaid"
        reference_id,
        type,          // "credit" or "debit"
        created_by,
      } = req.body;

      const numericAmount = parseFloat(amount);

      // ✅ Check if an existing unpaid payment of same type exists
      const existingPayment = await Payment.findOne({
        where: {
          institute_id,
          type,
          status: "Unpaid", // Optional: only aggregate unpaid payments
        },
      });

      if (existingPayment) {
        // ✅ Add to existing payment
        existingPayment.amount += numericAmount;
        existingPayment.description += `; ${description}`;
        existingPayment.updated_by = created_by;
        await existingPayment.save();

        return res.status(200).json({
          message: "Payment updated by adding to existing record.",
          payment: existingPayment,
        });
      }

      // ✅ Otherwise, create a new payment
      const payment = await Payment.create({
        institute_id,
        description,
        amount: numericAmount,
        status,
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

  // Get all payments with related institute data
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

  // Get payment by ID
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

  // Update payment
  async updatePayment(req, res) {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) {
        return res.status(404).json({ error: "Payment not found" });
      }

      const {
        description,
        amount,
        status,
        reference_id,
        type,
        updated_by,
      } = req.body;

      await payment.update({
        description: description || payment.description,
        amount: amount || payment.amount,
        status: status || payment.status,
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
