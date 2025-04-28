const express = require("express");
const router = express.Router();
const instituteController = require("../controllers/instituteController");

// Route to create a new institute
router.post("/", instituteController.createInstitute);

// Route to get all institutes
router.get("/", instituteController.getAllInstitutes);

// New route to search institutes by username, name, or address
router.get("/search", instituteController.getInstitutesByUsernameOrName);

// Route to get an institute by its slug
router.get("/slug/:slug", instituteController.getInstituteBySlug);

// Route to get a specific institute by its ID
router.get("/:id", instituteController.getInstitute);

// Route to update an institute by its ID
router.put("/:id", instituteController.updateInstitute);

// Route to delete an institute by its ID
router.delete("/:id", instituteController.deleteInstitute);

module.exports = router;