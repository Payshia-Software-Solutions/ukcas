const { Institute } = require("../models/index");
const { Op } = require("sequelize");

const instituteController = {
  async createInstitute(req, res) {
    try {
      const institute = await Institute.create(req.body);
      res.status(201).json(institute);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllInstitutes(req, res) {
    try {
      const institutes = await Institute.findAll();
      res.json(institutes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getInstitute(req, res) {
    try {
      const institute = await Institute.findByPk(req.params.id);
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      res.json(institute);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getInstituteBySlug(req, res) {
    try {
      
      const institute = await Institute.findOne({ where: { slug: req.params.slug } });
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      res.json(institute);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateInstitute(req, res) {
    try {
      const institute = await Institute.findByPk(req.params.id);
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      await institute.update(req.body);
      res.json(institute);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteInstitute(req, res) {
    try {
      const institute = await Institute.findByPk(req.params.id);
      if (!institute) return res.status(404).json({ error: "Institute not found" });
      await institute.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // New search function for finding institutes by username, name, or other properties


  async getInstitutesByUsernameOrName(req, res) {
    try {
      const { value } = req.query; // Get the search value from query params
      
  
      if (!value) {
        return res.status(400).json({ error: "Search value is required" });
      }
  
      // Search the database with the updated query logic
      const institutes = await Institute.findAll({
        where: {
          [Op.or]: [
            { username: { [Op.like]: `%${value}%` } },  // Search by username
            { name: { [Op.like]: `%${value}%` } },      // Search by name

          ],
        },
        limit: 5, // Limit to 5 results
      });
  
      if (institutes.length === 0) {
        return res.status(404).json({ error: "Institute not found" });
      }
  
      res.json(institutes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
};

module.exports = instituteController;
