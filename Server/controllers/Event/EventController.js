const { Event } = require("../../models/Event/Event");

const eventController = {
  // Create a new event
  async createEvent(req, res) {
    try {
      const event = await Event.create(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Get all events
  async getAllEvents(req, res) {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get a single event by ID
  async getEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update an event by ID
  async updateEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      await event.update(req.body);
      res.json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete an event by ID
  async deleteEvent(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });
      await event.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Example of adding extra functionality: Activating/Deactivating an event
  async toggleEventStatus(req, res) {
    try {
      const event = await Event.findByPk(req.params.id);
      if (!event) return res.status(404).json({ error: "Event not found" });

      // Toggle the event's isActive status
      const updatedEvent = await event.update({
        isActive: !event.isActive
      });

      res.json({
        message: `Event ${updatedEvent.isActive ? "activated" : "deactivated"}`,
        event: updatedEvent
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = eventController;
