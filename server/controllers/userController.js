const { UserMaintenance } = require("../models/index");

const userMaintenanceController = {
  // Create a new UserMaintenance entry
  async createUserMaintenance(req, res) {
    try {
      const { institute_name, email, password, registered_date, institute_address, created_by } = req.body;

      const userMaintenance = await UserMaintenance.create({
        institute_name,
        email,
        password,
        registered_date,
        institute_address,
        created_by,
      });

      res.status(201).json(userMaintenance);
    } catch (error) {
      console.error("Error creating User Maintenance entry:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Get all UserMaintenance entries
  async getAllUserMaintenances(req, res) {
    try {
      const userMaintenances = await UserMaintenance.findAll();
      res.json(userMaintenances);
    } catch (error) {
      console.error("Error fetching User Maintenance entries:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Get a specific UserMaintenance entry by ID
  async getUserMaintenance(req, res) {
    try {
      const userMaintenance = await UserMaintenance.findByPk(req.params.id);
      if (!userMaintenance) {
        return res.status(404).json({ error: "User Maintenance entry not found" });
      }
      res.json(userMaintenance);
    } catch (error) {
      console.error("Error fetching User Maintenance entry:", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Update UserMaintenance entry
  async updateUserMaintenance(req, res) {
    try {
      const userMaintenance = await UserMaintenance.findByPk(req.params.id);
      if (!userMaintenance) {
        return res.status(404).json({ error: "User Maintenance entry not found" });
      }

      const updatedData = {
        institute_name: req.body.institute_name || userMaintenance.institute_name,
        email: req.body.email || userMaintenance.email,
        password: req.body.password || userMaintenance.password,
        registered_date: req.body.registered_date || userMaintenance.registered_date,
        institute_address: req.body.institute_address || userMaintenance.institute_address,
        updated_by: req.body.updated_by || userMaintenance.updated_by,
      };

      await userMaintenance.update(updatedData);
      res.json(userMaintenance);
    } catch (error) {
      console.error("Error updating User Maintenance entry:", error);
      res.status(400).json({ error: error.message });
    }
  },

  // Delete UserMaintenance entry by ID
  async deleteUserMaintenance(req, res) {
    try {
      const userMaintenance = await UserMaintenance.findByPk(req.params.id);
      if (!userMaintenance) {
        return res.status(404).json({ error: "User Maintenance entry not found" });
      }
      await userMaintenance.destroy();
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting User Maintenance entry:", error);
      res.status(500).json({ error: error.message });
    }
  },

};

module.exports = userMaintenanceController;
