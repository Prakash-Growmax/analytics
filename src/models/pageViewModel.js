// src/models/pageViewModel.js
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

const VALID_PAGE_TYPES = [
  "home",
  "product",
  "category",
  "cart",
  "checkout",
  "search",
  "account",
  "other",
];

export const PageViewModel = {
  // Create new page view
  async createPageView({
    event_id,
    page_type,
    entity_id,
    duration_seconds,
    scroll_depth_percentage,
    max_scroll_percentage,
    interaction_count,
  }) {
    // Validate page type
    if (!VALID_PAGE_TYPES.includes(page_type)) {
      throw new Error(
        `Invalid page_type. Must be one of: ${VALID_PAGE_TYPES.join(", ")}`
      );
    }

    const query = `
            INSERT INTO page_views (
                id,
                event_id,
                page_type,
                entity_id,
                duration_seconds,
                scroll_depth,
                max_scroll,
                interaction_count
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *
        `;

    const {
      rows: [pageView],
    } = await pool.query(query, [
      uuidv4(),
      event_id,
      page_type,
      entity_id,
      duration_seconds,
      scroll_depth_percentage,
      max_scroll_percentage,
      interaction_count || 0,
    ]);

    return pageView;
  },

  // Get page view by ID
  async getPageViewById(id, tenant_id) {
    const query = `
            SELECT pv.*, 
                   e.tenant_id,
                   e.visitor_id,
                   e.session_id,
                   e.page_url,
                   e.page_title,
                   e.occurred_at
            FROM page_views pv
            JOIN events e ON e.id = pv.event_id
            WHERE pv.id = $1 AND e.tenant_id = $2
        `;
    const {
      rows: [pageView],
    } = await pool.query(query, [id, tenant_id]);
    return pageView;
  },

  // Update page view metrics
  async updatePageViewMetrics(
    id,
    tenant_id,
    {
      duration_seconds,
      scroll_depth_percentage,
      max_scroll_percentage,
      interaction_count,
    }
  ) {
    const query = `
            UPDATE page_views pv
            SET 
                duration_seconds = COALESCE($1, duration_seconds),
                scroll_depth= COALESCE($2, scroll_depth),
                max_scroll = COALESCE($3, max_scroll),
                interaction_count = interaction_count + COALESCE($4, 0)
            FROM events e
            WHERE pv.event_id = e.id
            AND pv.id = $5 
            AND e.tenant_id = $6
            RETURNING pv.*, e.tenant_id, e.visitor_id, e.session_id, e.page_url, e.page_title, e.occurred_at
        `;

    const {
      rows: [pageView],
    } = await pool.query(query, [
      duration_seconds,
      scroll_depth_percentage,
      max_scroll_percentage,
      interaction_count,
      id,
      tenant_id,
    ]);

    return pageView;
  },

  // List page views
  async listPageViews({
    tenant_id,
    page_type,
    entity_id,
    visitor_id,
    session_id,
    start_date,
    end_date,
    limit = 50,
    offset = 0,
  }) {
    const conditions = ["e.tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (page_type) {
      conditions.push(`pv.page_type = $${++paramCount}`);
      params.push(page_type);
    }

    if (entity_id) {
      conditions.push(`pv.entity_id = $${++paramCount}`);
      params.push(entity_id);
    }

    if (visitor_id) {
      conditions.push(`e.visitor_id = $${++paramCount}`);
      params.push(visitor_id);
    }

    if (session_id) {
      conditions.push(`e.session_id = $${++paramCount}`);
      params.push(session_id);
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
            SELECT pv.*, 
                   e.tenant_id,
                   e.visitor_id,
                   e.session_id,
                   e.page_url,
                   e.page_title,
                   e.occurred_at,
                   v.anonymous_id,
                   v.user_id
            FROM page_views pv
            JOIN events e ON e.id = pv.event_id
            JOIN visitors v ON v.id = e.visitor_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY e.occurred_at DESC
            LIMIT $${++paramCount} OFFSET $${++paramCount}
        `;

    params.push(limit, offset);
    const { rows } = await pool.query(query, params);
    return rows;
  },

  // Get page view statistics
  async getPageViewStats(tenant_id, { start_date, end_date } = {}) {
    let conditions = ["e.tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (start_date) {
      conditions.push(`e.occurred_at >= $${++paramCount}`);
      params.push(start_date);
    }

    if (end_date) {
      conditions.push(`e.occurred_at <= $${++paramCount}`);
      params.push(end_date);
    }

    const query = `
            SELECT 
                pv.page_type,
                COUNT(*) as view_count,
                COUNT(DISTINCT e.visitor_id) as unique_visitors,
                COUNT(DISTINCT e.session_id) as unique_sessions,
                ROUND(AVG(pv.duration_seconds)) as avg_duration_seconds,
                ROUND(AVG(pv.scroll_depth)) as avg_scroll_depth,
                ROUND(AVG(pv.interaction_count)) as avg_interactions,
            FROM page_views pv
            JOIN events e ON e.id = pv.event_id
            WHERE ${conditions.join(" AND ")}
            GROUP BY pv.page_type
            ORDER BY view_count DESC
        `;

    const { rows } = await pool.query(query, params);
    return rows;
  },
};
