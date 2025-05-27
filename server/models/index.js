const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Import models
const Student = require("./Student");
const Institute = require("./Institute");
const Certificate = require("./Certificate");
const Payment = require("./Payment"); // ✅ Make sure this line is added

// Define associations
Student.belongsTo(Institute, { foreignKey: "institute_id" });
Institute.hasMany(Student, { foreignKey: "institute_id" });

Certificate.belongsTo(Student, { foreignKey: "student_id" });
Certificate.belongsTo(Institute, { foreignKey: "institute_id" }); // if you have this
Payment.belongsTo(Institute, { foreignKey: "institute_id" }); // ✅ Now this will work
Institute.hasMany(Payment, { foreignKey: "institute_id" });    // ✅ Optional but helpful

// Export all models
module.exports = {
  sequelize,
  Sequelize,
  Student,
  Institute,
  Certificate,
  Payment, // ✅ Don't forget to export it
};
