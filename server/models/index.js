const Course = require("./course");
const News = require("./News");
const ContactUs = require("./ContactUs");
const Curriculum = require("./Curriculum");  //Certificate
const Comment = require("./Comment");
const AccrediteForm = require("./AccrediteForm");     
const Institute = require("./Institute");     
const Student = require("./Student");
const Certificate = require("./Certificate");




// Relations
Student.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Institute.hasMany(Student, {
  foreignKey: "institute_id",
});

Certificate.belongsTo(Institute, {
  foreignKey: "institute_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Certificate.belongsTo(Student, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Institute.hasMany(Certificate, {
  foreignKey: "institute_id",
});

Student.hasMany(Certificate, {
  foreignKey: "student_id",
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
  Certificate
};
