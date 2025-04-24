const { Student, Institute } = require("../models/index");

const studentController = {
  async createStudent(req, res) {
    try {
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAllStudents(req, res) {
    try {
      const students = await Student.findAll({
        include: [{ model: Institute }],
      });
      res.json(students);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getStudent(req, res) {
    try {
      const student = await Student.findByPk(req.params.id, {
        include: [{ model: Institute }],
      });
      if (!student) return res.status(404).json({ error: "Student not found" });
      res.json(student);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateStudent(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      await student.update(req.body);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deleteStudent(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });
      await student.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = studentController;
