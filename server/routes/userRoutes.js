const express = require("express");
const router = express.Router();
const userMaintenanceController = require("../controllers/userController");
const multer = require("multer");

const upload = multer(); // using memory storage by default

// ✅ IMPORTANT: Login route MUST come before the general POST route
router.post("/login", userMaintenanceController.login);

// ✅ Create a new UserMaintenance entry (Registration)
router.post("/", userMaintenanceController.createUserMaintenance);

// ✅ Get all UserMaintenance entries
router.get("/", userMaintenanceController.getAllUserMaintenances);

// ✅ Get a UserMaintenance entry by ID
router.get("/:id", userMaintenanceController.getUserMaintenance);

// ✅ Update a UserMaintenance entry
router.put("/:id", userMaintenanceController.updateUserMaintenance);

// ✅ Delete a UserMaintenance entry by ID
router.delete("/:id", userMaintenanceController.deleteUserMaintenance);

module.exports = router;