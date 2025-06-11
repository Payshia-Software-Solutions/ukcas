const Sequelize = require("sequelize");
const sequelize = require("../config/database");

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
const Payment = require("./Payment");
const UserMaintenance = require("./User");


// Define associations

// Student <-> Institute
Student.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
});
Institute.hasMany(Student, {
  foreignKey: "institute_id",
});

// Certificate <-> Institute
Certificate.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Institute.hasMany(Certificate, {
  foreignKey: "institute_id",
});

// Certificate <-> Student
Certificate.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Student.hasMany(Certificate, {
  foreignKey: "student_id",
});

// Payment <-> Institute
Payment.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
});
Institute.hasMany(Payment, {
  foreignKey: "institute_id",
});

// Export all models
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
  Payment,
  UserMaintenance,
};



