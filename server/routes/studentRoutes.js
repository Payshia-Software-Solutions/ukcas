const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const multer = require("multer");

const upload = multer(); // using memory storage by default

// ✅ Accept FormData (text fields only, no files)
router.post("/", upload.none(), studentController.createStudent);

// ✅ Other routes remain unchanged
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudent);
router.put("/:id", studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
