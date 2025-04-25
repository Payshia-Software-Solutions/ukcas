const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

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
  },
  {
    tableName: "institute",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Institute;
