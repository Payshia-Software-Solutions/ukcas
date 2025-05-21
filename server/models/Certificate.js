const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/database");

const Certificate = sequelize.define(
  "Certificate",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,  // Must match Student.id type
      allowNull: false,
    },
    certificate_id: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    student_name_initial: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    issued_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    student_name_full: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    student_grade: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING(255),
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
    tableName: "certificates",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      beforeCreate: async (certificate) => {
        const year = new Date().getFullYear();
        const lastTwoDigitsOfYear = year.toString().slice(-2);
        const month = new Date().getMonth() + 1;
        const monthStr = month.toString().padStart(2, "0");

        const baseCertificateId = `C${lastTwoDigitsOfYear}${monthStr}`;

        const lastCertificate = await Certificate.findOne({
          where: {
            certificate_id: {
              [Op.like]: `${baseCertificateId}%`,
            },
          },
          order: [["id", "DESC"]],
          attributes: ["certificate_id"],
        });

        let newNumber = 1;
        if (lastCertificate && lastCertificate.certificate_id) {
          const lastNum = lastCertificate.certificate_id.slice(-2);
          newNumber = parseInt(lastNum, 10) + 1;
        }

        const newCertificateId = `${baseCertificateId}${newNumber.toString().padStart(2, "0")}`;
        certificate.certificate_id = newCertificateId;
      },
    },
  }
);

module.exports = Certificate;
