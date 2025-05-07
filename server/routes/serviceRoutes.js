const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/serviceController");

// Create a new service
router.post("/", serviceController.createService);

// Get all services
router.get("/", serviceController.getAllServices);

// Get a service by ID
router.get("/:id", serviceController.getService);

// Get a service by slug
router.get("/slug/:slug", serviceController.getServiceBySlug);

// Update a service by ID
router.put("/:id", serviceController.updateService);

// Delete a service by ID
router.delete("/:id", serviceController.deleteService);

module.exports = router;
