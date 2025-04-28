const { DataTypes, Op } = require("sequelize");  // Import Op here
const sequelize = require("../config/database");
const slugify = require("slugify");

const Institute = sequelize.define(
  "Institute",
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
    slug: {
      type: DataTypes.STRING(255),
      unique: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    mobile_number: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    img_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    mini_description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    terms_and_conditions: {
      type: DataTypes.TEXT,
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
    tableName: "institute",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeValidate: (institute) => {
        if (institute.name) {
          institute.slug = slugify(institute.name, { lower: true, strict: true });
        }
      },
      beforeCreate: async (institute) => {

        const year = new Date().getFullYear();
        const lastTwoDigitsOfYear = year.toString().slice(-2); // Last two digits of the year (e.g., '25' for 2025)
        const month = new Date().getMonth() + 1; // getMonth() is 0-based, so we add 1
        const monthStr = month.toString().padStart(2, "0"); // Ensure two digits for the month (e.g., '01', '02', etc.)

        // Create the base part of the username: "I" + last two digits of the year + two digits for the month
        const baseUsername = `I${lastTwoDigitsOfYear}${monthStr}`;

        // Find the last institute's username for the same year and month
        const lastInstitute = await Institute.findOne({
          where: {
            username: {
              [Op.like]: `${baseUsername}%`, // Correctly use Op.like to match based on year and month
            },
          },
          order: [["id", "DESC"]], // Order by id to get the latest one
          attributes: ["username"],
        });

   
        let newNumber = 1;
        if (lastInstitute && lastInstitute.username) {
   
          const lastNum = lastInstitute.username.slice(-2); 
          newNumber = parseInt(lastNum, 10) + 1; 
        }


        const newUsername = `${baseUsername}${newNumber.toString().padStart(2, "0")}`;
        institute.username = newUsername;
      },
    },
  }
);

module.exports = Institute;
