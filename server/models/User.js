const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const UserMaintenance = sequelize.define(
  "UserMaintenance",
  {
    // User Registration Data
    institute_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    registered_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    institute_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    // Tracking Fields
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
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "user_maintenance",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = UserMaintenance;
