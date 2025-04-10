const express = require("express");
const router = express.Router();
const eventController = require("../controllers/Event/EventController");

// Create a new event
router.post("/", eventController.createEvent);

// Get all events
router.get("/", eventController.getAllEvents);

// Get a single event by ID
router.get("/:id", eventController.getEvent);

// Update an event by ID
router.put("/:id", eventController.updateEvent);

// Delete an event by ID
router.delete("/:id", eventController.deleteEvent);

// Toggle event status (Activate/Deactivate)
router.patch("/:id/toggle", eventController.toggleEventStatus);

module.exports = router;
