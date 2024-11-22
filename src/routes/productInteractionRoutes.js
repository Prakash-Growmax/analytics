// src/routes/productInteractionRoutes.js
import express from "express";
import { validateApiKey } from "../middleware/auth.js";
import { ProductInteractionModel } from "../models/productInteractionModel.js";

const router = express.Router();

// Create product interaction
router.post("/", validateApiKey, async (req, res) => {
  try {
    const {
      event_id,
      product_id,
      category_id,
      interaction_type,
      position,
      price,
      quantity,
      list_type,
      properties,
    } = req.body;

    // Validate required fields
    if (!event_id || !product_id || !interaction_type) {
      return res.status(400).json({
        error: "event_id, product_id, and interaction_type are required",
      });
    }

    const interaction = await ProductInteractionModel.createInteraction({
      event_id,
      product_id,
      category_id,
      interaction_type,
      position,
      price,
      quantity,
      list_type,
      properties,
    });

    res.status(201).json(interaction);
  } catch (error) {
    console.error("Error creating product interaction:", error);
    if (error.message.includes("Invalid interaction_type")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

// Get product interaction by ID
router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const interaction = await ProductInteractionModel.getInteractionById(
      id,
      req.tenant_id
    );

    if (!interaction) {
      return res.status(404).json({ error: "Product interaction not found" });
    }

    res.json(interaction);
  } catch (error) {
    console.error("Error fetching product interaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// List product interactions
router.get("/", validateApiKey, async (req, res) => {
  try {
    const {
      product_id,
      category_id,
      interaction_type,
      visitor_id,
      session_id,
      list_type,
      start_date,
      end_date,
      limit,
      offset,
    } = req.query;

    const interactions = await ProductInteractionModel.listInteractions({
      tenant_id: req.tenant_id,
      product_id,
      category_id,
      interaction_type,
      visitor_id,
      session_id,
      list_type,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(interactions);
  } catch (error) {
    console.error("Error listing product interactions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get interaction statistics
router.get("/stats/overview", validateApiKey, async (req, res) => {
  try {
    const { start_date, end_date, product_id, category_id } = req.query;

    const stats = await ProductInteractionModel.getInteractionStats(
      req.tenant_id,
      {
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
        product_id,
        category_id,
      }
    );

    res.json(stats);
  } catch (error) {
    console.error("Error fetching interaction stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get product performance metrics
router.get("/stats/performance", validateApiKey, async (req, res) => {
  try {
    const { start_date, end_date, limit } = req.query;

    const performance = await ProductInteractionModel.getProductPerformance(
      req.tenant_id,
      {
        start_date: start_date ? new Date(start_date) : null,
        end_date: end_date ? new Date(end_date) : null,
        limit: parseInt(limit),
      }
    );

    res.json(performance);
  } catch (error) {
    console.error("Error fetching product performance:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
