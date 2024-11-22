const router = express.Router();
import express from "express"; // Use import instead of require
import { v4 as uuidv4 } from "uuid";
// Changed to named import

// Track visitor
router.post("/visitor", async (req, res) => {
  const { anonymous_id, user_id, device_info, location } = req.body;
  const tenant_id = req.tenant_id;

  try {
    const result = await pool.query(
      `INSERT INTO visitors (id, tenant_id, anonymous_id, user_id, device_info, location)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
      [uuidv4(), tenant_id, anonymous_id, user_id, device_info, location]
    );

    res.status(201).json({ visitor_id: result.rows[0].id });
  } catch (error) {
    console.error("Error creating visitor:", error);
    res.status(500).json({ error: "Failed to create visitor" });
  }
});

// Start session
router.post("/session", async (req, res) => {
  const { visitor_id, utm_source, utm_medium } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO sessions (id, visitor_id, started_at, utm_source, utm_medium, page_views, is_bounce)
         VALUES ($1, $2, NOW(), $3, $4, 0, true)
         RETURNING id`,
      [uuidv4(), visitor_id, utm_source, utm_medium]
    );

    res.status(201).json({ session_id: result.rows[0].id });
  } catch (error) {
    console.error("Error creating session:", error);
    res.status(500).json({ error: "Failed to create session" });
  }
});

// Track event
router.post("/event", async (req, res) => {
  const { session_id, event_type, event_name, page_url, properties } = req.body;

  try {
    // Create base event
    const eventResult = await pool.query(
      `INSERT INTO events (id, session_id, event_type, event_name, page_url, properties)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
      [uuidv4(), session_id, event_type, event_name, page_url, properties]
    );

    const eventId = eventResult.rows[0].id;

    // Handle specific event types
    switch (event_type) {
      case "pageview":
        await handlePageView(eventId, properties);
        break;
      case "product_interaction":
        await handleProductInteraction(eventId, properties);
        break;
      case "search":
        await handleSearchEvent(eventId, properties);
        break;
    }

    // Update session page views
    await pool.query(
      `UPDATE sessions 
         SET page_views = page_views + 1,
             is_bounce = false
         WHERE id = $1`,
      [session_id]
    );

    res.status(201).json({ event_id: eventId });
  } catch (error) {
    console.error("Error tracking event:", error);
    res.status(500).json({ error: "Failed to track event" });
  }
});

// Helper functions for specific event types
async function handlePageView(eventId, properties) {
  const { page_type, duration_seconds, scroll_depth_percentage } = properties;

  await pool.query(
    `INSERT INTO page_views (id, event_id, page_type, duration_seconds, scroll_depth_percentage)
       VALUES ($1, $2, $3, $4, $5)`,
    [uuidv4(), eventId, page_type, duration_seconds, scroll_depth_percentage]
  );
}

async function handleProductInteraction(eventId, properties) {
  const { product_id, interaction_type, position, price } = properties;

  await pool.query(
    `INSERT INTO product_interactions (id, event_id, product_id, interaction_type, position, price)
       VALUES ($1, $2, $3, $4, $5, $6)`,
    [uuidv4(), eventId, product_id, interaction_type, position, price]
  );
}

async function handleSearchEvent(eventId, properties) {
  const { search_query, results_count, converted_to_cart } = properties;

  await pool.query(
    `INSERT INTO search_events (id, event_id, search_query, results_count, converted_to_cart)
       VALUES ($1, $2, $3, $4, $5)`,
    [uuidv4(), eventId, search_query, results_count, converted_to_cart]
  );
}

export default router;
