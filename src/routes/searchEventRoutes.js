// src/routes/searchEventRoutes.js
import express from "express";
import { validateApiKey } from "../middleware/auth.js";
import { SearchEventModel } from "../models/searchEventModel.js";

const router = express.Router();

router.post("/", validateApiKey, async (req, res) => {
  try {
    const {
      event_id,
      search_query,
      results_count,
      category_filter,
      price_filter,
      other_filters,
    } = req.body;

    if (!event_id || !search_query) {
      return res.status(400).json({
        error: "event_id and search_query are required",
      });
    }

    const searchEvent = await SearchEventModel.createSearchEvent({
      event_id,
      search_query,
      results_count,
      category_filter,
      price_filter,
      other_filters,
    });

    res.status(201).json(searchEvent);
  } catch (error) {
    console.error("Error creating search event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id/metrics", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const { position_clicked, converted_to_product_view, converted_to_cart } =
      req.body;

    const searchEvent = await SearchEventModel.updateSearchMetrics(
      id,
      req.tenant_id,
      {
        position_clicked,
        converted_to_product_view,
        converted_to_cart,
      }
    );

    if (!searchEvent) {
      return res.status(404).json({ error: "Search event not found" });
    }

    res.json(searchEvent);
  } catch (error) {
    console.error("Error updating search metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", validateApiKey, async (req, res) => {
  try {
    const { id } = req.params;
    const searchEvent = await SearchEventModel.getSearchEventById(
      id,
      req.tenant_id
    );

    if (!searchEvent) {
      return res.status(404).json({ error: "Search event not found" });
    }

    res.json(searchEvent);
  } catch (error) {
    console.error("Error fetching search event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", validateApiKey, async (req, res) => {
  try {
    const {
      search_query,
      category_filter,
      start_date,
      end_date,
      converted_only,
      limit,
      offset,
    } = req.query;

    const searchEvents = await SearchEventModel.listSearchEvents({
      tenant_id: req.tenant_id,
      search_query,
      category_filter,
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
      converted_only: converted_only === "true",
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json(searchEvents);
  } catch (error) {
    console.error("Error listing search events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/stats/overview", validateApiKey, async (req, res) => {
  try {
    const { start_date, end_date } = req.query;

    const stats = await SearchEventModel.getSearchStats(req.tenant_id, {
      start_date: start_date ? new Date(start_date) : null,
      end_date: end_date ? new Date(end_date) : null,
    });

    res.json(stats);
  } catch (error) {
    console.error("Error fetching search stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
