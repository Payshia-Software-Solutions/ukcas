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
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    postal_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(100),
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
  },
  {
    tableName: "student",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (student) => {
        // Get the current year and month in "YYMM" format
        const year = new Date().getFullYear();
        const lastTwoDigitsOfYear = year.toString().slice(-2); // Last two digits of the year (e.g., '25' for 2025)
        const month = new Date().getMonth() + 1; // getMonth() is 0-based, so we add 1
        const monthStr = month.toString().padStart(2, "0"); // Ensure two digits for the month (e.g., '01', '02', etc.)

        // Create the base part of the username: "S" + last two digits of the year + two digits for the month
        const baseUsername = `S${lastTwoDigitsOfYear}${monthStr}`;

        // Find the last student's username for the same year and month
        const lastStudent = await Student.findOne({
          where: {
            username: {
              [Op.like]: `${baseUsername}%`, // Correctly use Op.like to match based on year and month
            },
          },
          order: [["id", "DESC"]], // Order by id to get the latest one
          attributes: ["username"],
        });

        // If a username exists, extract the number and increment it. Otherwise, start with 1.
        let newNumber = 1;
        if (lastStudent && lastStudent.username) {
          // Extract the last number part from the username
          const lastNum = lastStudent.username.slice(-2); // Extract the last 2 digits
          newNumber = parseInt(lastNum, 10) + 1; 
        }

        const newUsername = `${baseUsername}${newNumber.toString().padStart(2, "0")}`;
        student.username = newUsername;
      },
    },
  }
);

module.exports = Student;
