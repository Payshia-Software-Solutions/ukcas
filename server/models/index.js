const Course = require("./course");
const News = require("./News");
const ContactUs = require("./ContactUs");
const Curriculum = require("./Curriculum");
const Comment = require("./Comment");
const AccrediteForm = require("./AccrediteForm");
const Institute = require("./Institute");
const Student = require("./Student");
const Certificate = require("./Certificate");
const Service = require("./Service");

// Define associations

// Student <-> Institute
Student.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Institute.hasMany(Student, {
  foreignKey: "institute_id",
});

// Certificate <-> Student (institute relationship removed)
Certificate.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

module.exports = {
  Course,
  News,
  ContactUs,
  Curriculum,
  Comment,
  AccrediteForm,
  Institute,
  Student,
  Certificate,
  Service,
};
