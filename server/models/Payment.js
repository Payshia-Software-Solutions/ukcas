const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/database");

const Payment = sequelize.define(
  "Payment",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    reference_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("topup", "certificate_fee"),
      allowNull: false,
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
    tableName: "payments",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Static method to generate reference ID
Payment.generateReferenceId = async function() {
  const year = new Date().getFullYear();
  const baseRefId = `R${year}`;

  try {
    // Use raw query to avoid any potential circular reference issues
    const [results] = await sequelize.query(
      "SELECT reference_id FROM payments WHERE reference_id LIKE ? ORDER BY id DESC LIMIT 1",
      {
        replacements: [`${baseRefId}%`],
        type: sequelize.QueryTypes.SELECT
      }
    );

    let newNumber = 1;
    if (results && results.reference_id) {
      const lastNum = parseInt(results.reference_id.slice(-3), 10);
      newNumber = lastNum + 1;
    }

    return `${baseRefId}${newNumber.toString().padStart(3, "0")}`;
  } catch (error) {
    console.error("Error generating reference_id:", error);
    // Fallback to timestamp-based reference
    const timestamp = Date.now().toString().slice(-6);
    return `R${year}${timestamp}`;
  }
};

module.exports = Payment;
