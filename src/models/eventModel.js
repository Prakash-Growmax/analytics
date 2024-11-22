// src/models/eventModel.js
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

const VALID_EVENT_TYPES = [
  "pageview",
  "product_view",
  "product_click",
  "add_to_cart",
  "remove_from_cart",
  "search",
  "category_view",
  "custom",
];

export const EventModel = {
  // Create new event
  async createEvent({
    tenant_id,
    visitor_id,
    session_id,
    event_type,
    event_name,
    page_url,
    page_title,
    page_referrer,
    properties = {},
  }) {
    // Validate event type
    if (!VALID_EVENT_TYPES.includes(event_type)) {
      throw new Error(
        `Invalid event_type. Must be one of: ${VALID_EVENT_TYPES.join(", ")}`
      );
    }

    const query = `
            INSERT INTO events (
                id,
                tenant_id,
                visitor_id,
                session_id,
                event_type,
                event_name,
                page_url,
                page_title,
                page_referrer,
                properties
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;

    const {
      rows: [event],
    } = await pool.query(query, [
      uuidv4(),
      tenant_id,
      visitor_id,
      session_id,
      event_type,
      event_name,
      page_url,
      page_title,
      page_referrer,
      properties,
    ]);

    return event;
  },

  // Get event by ID
  async getEventById(id, tenant_id) {
    const query = `
            SELECT e.*,
                   v.anonymous_id,
                   v.user_id,
                   s.started_at as session_started_at
            FROM events e
            JOIN visitors v ON v.id = e.visitor_id
            JOIN sessions s ON s.id = e.session_id
            WHERE e.id = $1 AND e.tenant_id = $2
        `;
    const {
      rows: [event],
    } = await pool.query(query, [id, tenant_id]);
    return event;
  },

  // List events with filters
  async listEvents({
    tenant_id,
    visitor_id,
    session_id,
    event_type,
    start_date,
    end_date,
    limit = 50,
    offset = 0,
  }) {
    const conditions = ["e.tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (visitor_id) {
      conditions.push(`e.visitor_id = $${++paramCount}`);
      params.push(visitor_id);
    }

    if (session_id) {
      conditions.push(`e.session_id = $${++paramCount}`);
      params.push(session_id);
    }

    if (event_type) {
      conditions.push(`e.event_type = $${++paramCount}`);
      params.push(event_type);
    }

    if (start_date) {
      conditions.push(`e.occurred_at >= $${++paramCount}`);
      params.push(start_date);
    }

    if (end_date) {
      conditions.push(`e.occurred_at <= $${++paramCount}`);
      params.push(end_date);
    }

    const query = `
            SELECT e.*,
                   v.anonymous_id,
                   v.user_id,
                   s.started_at as session_started_at
            FROM events e
            JOIN visitors v ON v.id = e.visitor_id
            JOIN sessions s ON s.id = e.session_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY occurred_at DESC
            LIMIT $${++paramCount} OFFSET $${++paramCount}
        `;

    params.push(limit, offset);
    const { rows } = await pool.query(query, params);
    return rows;
  },

  // Get event statistics
  async getEventStats(tenant_id, { start_date, end_date } = {}) {
    let conditions = ["tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (start_date) {
      conditions.push(`occurred_at >= $${++paramCount}`);
      params.push(start_date);
    }

    if (end_date) {
      conditions.push(`occurred_at <= $${++paramCount}`);
      params.push(end_date);
    }

    const query = `
            SELECT 
                event_type,
                COUNT(*) as total_count,
                COUNT(DISTINCT visitor_id) as unique_visitors,
                COUNT(DISTINCT session_id) as unique_sessions,
                TO_CHAR(MIN(occurred_at), 'YYYY-MM-DD HH24:MI:SS') as first_seen,
                TO_CHAR(MAX(occurred_at), 'YYYY-MM-DD HH24:MI:SS') as last_seen
            FROM events
            WHERE ${conditions.join(" AND ")}
            GROUP BY event_type
            ORDER BY total_count DESC
        `;

    const { rows } = await pool.query(query, params);
    return rows;
  },
};
