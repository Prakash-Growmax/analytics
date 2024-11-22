// src/routes/sessionRoutes.js
import express from "express";
import { validateApiKey } from "../middleware/auth.js";
import { SessionModel } from "../models/sessionModel.js";

const router = express.Router();

// Create new session
router.post("/", validateApiKey, async (req, res) => {
  try {
    const {
      visitor_id,
      initial_referrer,
      initial_page,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      device_type,
      is_mobile,
      browser,
      os,
    } = req.body;

    if (!visitor_id) {
      return res.status(400).json({ error: "visitor_id is required" });
    }

    const session = await SessionModel.createSession({
      tenant_id: req.tenant_id,
      visitor_id,
      initial_referrer,
      initial_page,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content,
      utm_term,
      device_type,
      is_mobile,
      browser,
      os,
    });

    res.status(201).json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// End session
router.post("/:id/end", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionModel.endSession(id, req.tenant_id);

    if (!session) {
      return res
        .status(404)
        .json({ error: "Session not found or already ended" });
    }

    res.json(session);
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update session metrics
router.patch("/:id/metrics", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const { page_views, duration_seconds } = req.body;

    const session = await SessionModel.updateSessionMetrics(id, req.tenant_id, {
      page_views,
      duration_seconds,
    });

    if (!session) {
      return res
        .status(404)
        .json({ error: "Session not found or already ended" });
    }

    res.json(session);
  } catch (error) {
    console.error("Error updating session metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get session by ID
router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const session = await SessionModel.getSessionById(id, req.tenant_id);

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(session);
  } catch (error) {
    console.error("Error fetching session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List sessions
router.get("/", validateApiKey, async (req, res) => {
  try {
    const {
      visitor_id,
      limit = 50,
      offset = 0,
      start_date,
      end_date,
      is_active,
      utm_source,
      utm_medium,
      utm_campaign,
    } = req.query;

    const sessions = await SessionModel.listSessions({
      tenant_id: req.tenant_id,
      visitor_id,
      limit: parseInt(limit),
      offset: parseInt(offset),
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      is_active: is_active === "true",
      utm_source,
      utm_medium,
      utm_campaign,
    });

    res.json(sessions);
  } catch (error) {
    console.error("Error listing sessions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get session statistics
router.get("/stats/overview", validateApiKey, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const stats = await SessionModel.getSessionStats(req.tenant_id, {
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching session stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
