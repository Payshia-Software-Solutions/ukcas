const { Service } = require("../models/index");

const serviceController = {
  // Create a new service
  async createService(req, res) {
    try {
      const service = await Service.create(req.body);
      res.status(201).json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all services
  async getAllServices(req, res) {
    try {
      const serviceList = await Service.findAll();
      res.json(serviceList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single service by ID
  async getService(req, res) {
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single service by its slug
  async getServiceBySlug(req, res) {
    try {
      const service = await Service.findOne({ where: { slug: req.params.slug } });
      if (!service) return res.status(404).json({ error: "Service not found" });
      res.json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an existing service
  async updateService(req, res) {
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) return res.status(404).json({ error: "Service not found" });
      await service.update(req.body);
      res.json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a service
  async deleteService(req, res) {
    try {
      const service = await Service.findByPk(req.params.id);
      if (!service) return res.status(404).json({ error: "Service not found" });
      await service.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = serviceController;
