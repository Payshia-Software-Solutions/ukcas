const { ContactUs } = require("../models/index");

const contactUsController = {
  async createMessage(req, res) {
    try {
      const message = await ContactUs.create(req.body);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllMessages(req, res) {
    try {
      const messages = await ContactUs.findAll();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getMessage(req, res) {
    try {
      const message = await ContactUs.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      res.json(message);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateMessage(req, res) {
    try {
      const message = await ContactUs.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      await message.update(req.body);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteMessage(req, res) {
    try {
      const message = await ContactUs.findByPk(req.params.id);
      if (!message) return res.status(404).json({ error: "Message not found" });
      await message.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = contactUsController;
