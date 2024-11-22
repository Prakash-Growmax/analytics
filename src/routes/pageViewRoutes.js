// src/routes/pageViewRoutes.js
import express from "express";
import { validateApiKey } from "../middleware/auth.js";
import { PageViewModel } from "../models/pageViewModel.js";

const router = express.Router();

// Create page view
router.post("/", validateApiKey, async (req, res) => {
  try {
    const {
      event_id,
      page_type,
      entity_id,
      duration_seconds,
      scroll_depth_percentage,
      max_scroll_percentage,
      interaction_count,
    } = req.body;

    // Validate required fields
    if (!event_id || !page_type) {
      return res.status(400).json({
        error: "event_id and page_type are required",
      });
    }

    const pageView = await PageViewModel.createPageView({
      event_id,
      page_type,
      entity_id,
      duration_seconds,
      scroll_depth_percentage,
      max_scroll_percentage,
      interaction_count,
    });

    res.status(201).json(pageView);
  } catch (error) {
    console.error("Error creating page view:", error);
    if (error.message.includes("Invalid page_type")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Update page view metrics
router.patch("/:id/metrics", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      duration_seconds,
      scroll_depth_percentage,
      max_scroll_percentage,
      interaction_count,
    } = req.body;

    const pageView = await PageViewModel.updatePageViewMetrics(
      id,
      req.tenant_id,
      {
        duration_seconds,
        scroll_depth_percentage,
        max_scroll_percentage,
        interaction_count,
      }
    );

    if (!pageView) {
      return res.status(404).json({ error: "Page view not found" });
    }

    res.json(pageView);
  } catch (error) {
    console.error("Error updating page view metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get page view by ID
router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const pageView = await PageViewModel.getPageViewById(id, req.tenant_id);

    if (!pageView) {
      return res.status(404).json({ error: "Page view not found" });
    }

    res.json(pageView);
  } catch (error) {
    console.error("Error fetching page view:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List page views
router.get("/", validateApiKey, async (req, res) => {
  try {
    const {
      page_type,
      entity_id,
      visitor_id,
      session_id,
      start_date,
      end_date,
      limit,
      offset,
    } = req.query;

    const pageViews = await PageViewModel.listPageViews({
      tenant_id: req.tenant_id,
      page_type,
      entity_id,
      visitor_id,
      session_id,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(pageViews);
  } catch (error) {
    console.error("Error listing page views:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get page view statistics
router.get("/stats/overview", validateApiKey, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const stats = await PageViewModel.getPageViewStats(req.tenant_id, {
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching page view stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
