// src/models/searchEventModel.js
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

export const SearchEventModel = {
  async createSearchEvent({
    event_id,
    search_query,
    results_count,
    category_filter,
    price_filter,
    other_filters,
  }) {
    const query = `
            INSERT INTO search_events (
                id, event_id, search_query, results_count,
                category_filter, price_filter, other_filters
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *
        `;

    const {
      rows: [searchEvent],
    } = await pool.query(query, [
      uuidv4(),
      event_id,
      search_query,
      results_count,
      category_filter,
      price_filter,
      other_filters,
    ]);

    return searchEvent;
  },

  async updateSearchMetrics(
    id,
    tenant_id,
    { position_clicked, converted_to_product_view, converted_to_cart }
  ) {
    const query = `
            UPDATE search_events se
            SET 
                position_clicked = COALESCE($1, position_clicked),
                converted_to_product_view = COALESCE($2, converted_to_product_view),
                converted_to_cart = COALESCE($3, converted_to_cart)
            FROM events e
            WHERE se.event_id = e.id
            AND se.id = $4 AND e.tenant_id = $5
            RETURNING se.*, e.tenant_id
        `;

    const {
      rows: [searchEvent],
    } = await pool.query(query, [
      position_clicked,
      converted_to_product_view,
      converted_to_cart,
      id,
      tenant_id,
    ]);

    return searchEvent;
  },

  async getSearchEventById(id, tenant_id) {
    const query = `
            SELECT se.*, e.tenant_id, e.visitor_id, e.session_id, e.occurred_at
            FROM search_events se
            JOIN events e ON e.id = se.event_id
            WHERE se.id = $1 AND e.tenant_id = $2
        `;
    const {
      rows: [searchEvent],
    } = await pool.query(query, [id, tenant_id]);
    return searchEvent;
  },

  async listSearchEvents({
    tenant_id,
    search_query,
    category_filter,
    start_date,
    end_date,
    converted_only,
    limit = 50,
    offset = 0,
  }) {
    limit = Number.isNaN(Number(limit)) ? 50 : Math.max(0, Number(limit));
    offset = Number.isNaN(Number(offset)) ? 0 : Math.max(0, Number(offset));
    const conditions = ["e.tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (search_query) {
      conditions.push(`se.search_query ILIKE $${++paramCount}`);
      params.push(`%${search_query}%`);
    }

    if (category_filter) {
      conditions.push(`se.category_filter = $${++paramCount}`);
      params.push(category_filter);
    }

    if (start_date) {
      conditions.push(`se.occurred_at >= $${++paramCount}`);
      params.push(start_date);
    }

    if (end_date) {
      conditions.push(`se.occurred_at <= $${++paramCount}`);
      params.push(end_date);
    }

    if (converted_only) {
      conditions.push(
        "(se.converted_to_product_view = true OR se.converted_to_cart = true)"
      );
    }

    const query = `
            SELECT se.*, 
                   e.tenant_id, e.visitor_id, e.session_id, e.occurred_at,
                   v.anonymous_id, v.user_id
            FROM search_events se
            JOIN events e ON e.id = se.event_id
            JOIN visitors v ON v.id = e.visitor_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY e.occurred_at DESC
            LIMIT $${++paramCount} OFFSET $${++paramCount}
        `;

    params.push(limit, offset);
    const { rows } = await pool.query(query, params);
    return rows;
  },

  async getSearchStats(tenant_id, { start_date, end_date } = {}) {
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
                COUNT(*) as total_searches,
                COUNT(DISTINCT e.visitor_id) as unique_searchers,
                ROUND(AVG(se.results_count)) as avg_results,
                COUNT(NULLIF(se.position_clicked, 0)) as clicks,
                COUNT(CASE WHEN se.converted_to_product_view THEN 1 END) as product_views,
                COUNT(CASE WHEN se.converted_to_cart THEN 1 END) as cart_adds,
                ROUND(AVG(se.position_clicked) FILTER (WHERE se.position_clicked > 0)) as avg_click_position,
                ROUND((COUNT(CASE WHEN se.converted_to_cart THEN 1 END)::FLOAT / 
                       NULLIF(COUNT(*), 0) * 100)::numeric, 2) as conversion_rate
            FROM search_events se
            JOIN events e ON e.id = se.event_id
            WHERE ${conditions.join(" AND ")}
        `;

    const {
      rows: [stats],
    } = await pool.query(query, params);
    return stats;
  },
};
