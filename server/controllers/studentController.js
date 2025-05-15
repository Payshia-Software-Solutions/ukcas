const { Student, Institute } = require("../models/index");

const studentController = {
  // Create a new student
  async createStudent(req, res) {
    try {
      // Include the new fields (e.g., first_name, last_name, etc.)
      const student = await Student.create(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all students with related institute data
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

  // Get a specific student by ID with related institute data
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

  // Update student information
  async updateStudent(req, res) {
    try {
      const student = await Student.findByPk(req.params.id);
      if (!student) return res.status(404).json({ error: "Student not found" });

      // Ensure we only update fields that exist in the model
      const updatedData = {
        first_name: req.body.first_name || student.first_name,
        last_name: req.body.last_name || student.last_name,
        institute_id: req.body.institute_id || student.institute_id,
        nic: req.body.nic || student.nic,
        birthday: req.body.birthday || student.birthday,
        country: req.body.country || student.country,
        address: req.body.address || student.address,
        phone_number: req.body.phone_number || student.phone_number,
        email: req.body.email || student.email,
        postal_code: req.body.postal_code || student.postal_code,
      };

      await student.update(updatedData);
      res.json(student);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete a student by ID
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
