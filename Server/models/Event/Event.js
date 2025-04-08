const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    link: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,  // Ensure each event link is unique
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    updatedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    indexes: [
      {
        unique: true,
        fields: ["link"],
        name: "UniqueEventLink",
      },
    ],
  }
);

module.exports = Event;
