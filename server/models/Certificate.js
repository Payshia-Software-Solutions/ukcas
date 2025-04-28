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
    institute_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issue_date: {
      type: DataTypes.DATEONLY,
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
    certificate_id: {
      type: DataTypes.STRING(255),
      unique: true,
    },
  },
  {
    tableName: "certificate",
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
        
          const lastNum = lastCertificate.certificate_id.slice(-2); // Extract the last 2 digits
          newNumber = parseInt(lastNum, 10) + 1; // Increment the last number
        }

        // Create the new certificate_id by padding the counter to 2 digits
        const newCertificateId = `${baseCertificateId}${newNumber.toString().padStart(2, "0")}`;
        certificate.certificate_id = newCertificateId;
      },
    },
  }
);

module.exports = Certificate;
