const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const multer = require("multer");

const upload = multer(); // using memory storage by default

// ✅ Create a new student (accepting FormData, text fields only)
router.post("/", upload.none(), studentController.createStudent);

// ✅ Get all students with their institute
router.get("/", studentController.getAllStudents);

// ✅ Get a student by numeric database ID
router.get("/:id", studentController.getStudent);

// ✅ Get a student by custom student_id (like "S250501")
router.get("/by-student-id/:student_id", studentController.getStudentByStudentId);

// ✅ Update a student
router.put("/:id", studentController.updateStudent);

// ✅ Delete a student
router.delete("/:id", studentController.deleteStudent);

// NEW: Get all institutes (for dropdown in frontend form)
router.get("/institutes", studentController.getAllInstitutes);

router.get("/institute/:institute_id", studentController.getStudentsByInstituteId);


module.exports = router;
