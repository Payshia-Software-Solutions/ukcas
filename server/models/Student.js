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
    student_id: {            // <-- Added student_id field here
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,          // Assuming student_id should be unique, adjust if not
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
    tableName: "students", // Table name should be plural
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (student) => {
        const year = new Date().getFullYear();
        const lastTwoDigitsOfYear = year.toString().slice(-2);
        const month = new Date().getMonth() + 1;
        const monthStr = month.toString().padStart(2, "0");

        const baseUsername = `S${lastTwoDigitsOfYear}${monthStr}`;

        const lastStudent = await Student.findOne({
          where: {
            username: {
              [Op.like]: `${baseUsername}%`,
            },
          },
          order: [["id", "DESC"]],
          attributes: ["username"],
        });

        let newNumber = 1;
        if (lastStudent && lastStudent.username) {
          const lastNum = lastStudent.username.slice(-2);
          newNumber = parseInt(lastNum, 10) + 1;
        }

        const newUsername = `${baseUsername}${newNumber.toString().padStart(2, "0")}`;
        student.username = newUsername;
      },
    },
  }
);

module.exports = Student;
