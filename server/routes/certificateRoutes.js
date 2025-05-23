const express = require("express");
const router = express.Router();
const certificateController = require("../controllers/certificateController");

router.post("/", certificateController.createCertificate);
router.get("/", certificateController.getAllCertificates);
router.get("/search", certificateController.getCertificatesByCertificateId);
router.get("/:id", certificateController.getCertificate);
router.put("/:id", certificateController.updateCertificate);
router.delete("/:id", certificateController.deleteCertificate);

module.exports = router;