const express = require("express");
const router = express.Router();
const accrediteFormController = require("../controllers/accrediteFormController");

router.post("/", accrediteFormController.createAccrediteForm);
router.get("/", accrediteFormController.getAllAccrediteForms);
router.get("/:id", accrediteFormController.getAccrediteForm);
router.put("/:id", accrediteFormController.updateAccrediteForm);
router.delete("/:id", accrediteFormController.deleteAccrediteForm);

module.exports = router;
