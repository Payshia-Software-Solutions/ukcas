const express = require("express");
const router = express.Router();
const curriculumController = require("../controllers/curriculumController");

router.post("/", curriculumController.createCurriculum);
router.get("/", curriculumController.getAllCurriculums);
router.get("/:id", curriculumController.getCurriculum);
router.put("/:id", curriculumController.updateCurriculum);
router.delete("/:id", curriculumController.deleteCurriculum);

module.exports = router;
