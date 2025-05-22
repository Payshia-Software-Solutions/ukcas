const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/database");

const Student = sequelize.define(
  "Student",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: { // <-- auto-generated student ID
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    nic: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_by: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    updated_by: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    username: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
  },
  {
    tableName: "students",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (student) => {
        const now = new Date();
        const year = now.getFullYear();
        const lastTwoDigitsOfYear = year.toString().slice(-2);
        const month = now.getMonth() + 1;
        const monthStr = month.toString().padStart(2, "0");

        const baseId = `S${lastTwoDigitsOfYear}${monthStr}`;

        // Find last student with student_id starting with baseId
        const lastStudent = await Student.findOne({
          where: {
            student_id: {
              [Op.like]: `${baseId}%`,
            },
          },
          order: [["student_id", "DESC"]],
          attributes: ["student_id"],
        });

        let newSerial = 1;
        if (lastStudent && lastStudent.student_id) {
          const lastSerialStr = lastStudent.student_id.slice(-3);
          const lastSerialNum = parseInt(lastSerialStr, 10);
          newSerial = lastSerialNum + 1;
        }

        const serialStr = newSerial.toString().padStart(3, "0");

        student.student_id = `${baseId}${serialStr}`;
      },
    },
  }
);

module.exports = Student;
