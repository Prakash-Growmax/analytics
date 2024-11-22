// src/routes/visitorRoutes.js
import express from "express";
import { validateApiKey } from "../middleware/auth.js";
import { VisitorModel } from "../models/visitorModel.js";

const router = express.Router();

// Create/Update Visitor
router.post("/", validateApiKey, async (req, res) => {
  try {
    console.log("🚀 ~ validateApiKey ~ req.tenant_id :", req.tenant_id);
    const {
      anonymous_id,
      user_id,
      device_info,
      browser_info,
      location,
      user_properties,
    } = req.body;

    if (!anonymous_id && !user_id) {
      return res.status(400).json({
        error: "Either anonymous_id or user_id must be provided",
      });
    }

    const visitor = await VisitorModel.upsertVisitor({
      tenant_id: req.tenant_id,
      anonymous_id,
      user_id,
      device_info,
      browser_info,
      location,
      user_properties,
    });

    res.status(200).json(visitor);
  } catch (error) {
    console.error("Error in visitor creation/update:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Visitor by ID
router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const visitor = await VisitorModel.getVisitorById(id, req.tenant_id);

    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    res.json(visitor);
  } catch (error) {
    console.error("Error fetching visitor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List Visitors
router.get("/", validateApiKey, async (req, res) => {
  try {
    const { limit, offset, user_id, anonymous_id, start_date, end_date } =
      req.query;

    const visitors = await VisitorModel.listVisitors({
      tenant_id: req.tenant_id,
      limit: parseInt(limit) || 50,
      offset: parseInt(offset) || 0,
      user_id,
      anonymous_id,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
    });

    res.json(visitors);
  } catch (error) {
    console.error("Error listing visitors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Visitor Statistics
router.get("/stats/overview", validateApiKey, async (req, res) => {
  try {
    const stats = await VisitorModel.getVisitorStats(req.tenant_id);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching visitor stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete Visitor
router.delete("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await VisitorModel.deleteVisitor(id, req.tenant_id);

    if (!deleted) {
      return res.status(404).json({ error: "Visitor not found" });
    }

    res.json({ message: "Visitor and related data deleted successfully" });
  } catch (error) {
    console.error("Error deleting visitor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
