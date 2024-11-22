// src/routes/eventRoutes.js
import express from "express";
import { validateApiKey } from "../middleware/auth.js";
import { EventModel } from "../models/eventModel.js";

const router = express.Router();

// Create new event
router.post("/", validateApiKey, async (req, res) => {
  try {
    const {
      visitor_id,
      session_id,
      event_type,
      event_name,
      page_url,
      page_title,
      page_referrer,
      properties,
    } = req.body;

    // Validate required fields
    if (!visitor_id || !session_id || !event_type || !event_name || !page_url) {
      return res.status(400).json({
        error:
          "visitor_id, session_id, event_type, event_name, and page_url are required",
      });
    }

    const event = await EventModel.createEvent({
      tenant_id: req.tenant_id,
      visitor_id,
      session_id,
      event_type,
      event_name,
      page_url,
      page_title,
      page_referrer,
      properties,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    if (error.message.includes("Invalid event_type")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get event by ID
router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    console.log("🚀 ~ router.get ~ id:", id);
    const event = await EventModel.getEventById(id, req.tenant_id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List events
router.get("/", validateApiKey, async (req, res) => {
  try {
    const {
      visitor_id,
      session_id,
      event_type,
      start_date,
      end_date,
      limit,
      offset,
    } = req.query;

    const events = await EventModel.listEvents({
      tenant_id: req.tenant_id,
      visitor_id,
      session_id,
      event_type,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      limit: parseInt(limit) || 50,
      offset: parseInt(offset) || 0,
    });

    res.json(events);
  } catch (error) {
    console.error("Error listing events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get event statistics
router.get("/stats/overview", validateApiKey, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const stats = await EventModel.getEventStats(req.tenant_id, {
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching event stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
