// src/models/sessionModel.js
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

export const SessionModel = {
  // Create a new session
  async createSession({
    tenant_id,
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
  }) {
    const query = `
            INSERT INTO sessions (
                id,
                tenant_id,
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
                os
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
            RETURNING *
        `;

    const {
      rows: [session],
    } = await pool.query(query, [
      uuidv4(),
      tenant_id,
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
    ]);

    return session;
  },

  // End a session
  async endSession(session_id, tenant_id) {
    const now = new Date();
    const query = `
            UPDATE sessions 
            SET 
                ended_at = $1,
                duration_seconds = EXTRACT(EPOCH FROM ($1 - started_at))::INTEGER,
                total_duration_seconds = EXTRACT(EPOCH FROM ($1 - started_at))::INTEGER,
                is_bounce = (page_views <= 1)
            WHERE id = $2 AND tenant_id = $3 AND ended_at IS NULL
            RETURNING *
        `;

    const {
      rows: [session],
    } = await pool.query(query, [now, session_id, tenant_id]);
    return session;
  },

  // Update session metrics
  async updateSessionMetrics(
    session_id,
    tenant_id,
    { page_views, duration_seconds }
  ) {
    const query = `
            UPDATE sessions 
            SET 
                page_views = page_views + $1,
                total_duration_seconds = COALESCE(total_duration_seconds, 0) + $2,
                is_bounce = false
            WHERE id = $3 AND tenant_id = $4 AND ended_at IS NULL
            RETURNING *
        `;

    const {
      rows: [session],
    } = await pool.query(query, [
      page_views || 1,
      duration_seconds || 0,
      session_id,
      tenant_id,
    ]);
    return session;
  },

  // Get session by ID
  async getSessionById(id, tenant_id) {
    const query = `
            SELECT s.*, 
                   v.anonymous_id,
                   v.user_id
            FROM sessions s
            JOIN visitors v ON v.id = s.visitor_id
            WHERE s.id = $1 AND s.tenant_id = $2
        `;
    const {
      rows: [session],
    } = await pool.query(query, [id, tenant_id]);
    return session;
  },

  // List sessions with filters
  async listSessions({
    tenant_id,
    visitor_id,
    limit = 50,
    offset = 0,
    start_date,
    end_date,
    is_active,
    utm_source,
    utm_medium,
    utm_campaign,
  }) {
    const conditions = ["s.tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (visitor_id) {
      conditions.push(`s.visitor_id = $${++paramCount}`);
      params.push(visitor_id);
    }

    if (start_date) {
      conditions.push(`s.started_at >= $${++paramCount}`);
      params.push(start_date);
    }

    if (end_date) {
      conditions.push(`s.started_at <= $${++paramCount}`);
      params.push(end_date);
    }

    if (is_active !== undefined) {
      conditions.push(`s.ended_at IS ${is_active ? "NULL" : "NOT NULL"}`);
    }

    if (utm_source) {
      conditions.push(`s.utm_source = $${++paramCount}`);
      params.push(utm_source);
    }

    if (utm_medium) {
      conditions.push(`utm_medium = $${++paramCount}`);
      params.push(utm_medium);
    }

    if (utm_campaign) {
      conditions.push(`s.utm_campaign = $${++paramCount}`);
      params.push(utm_campaign);
    }

    const query = `
            SELECT s.*, 
                   v.anonymous_id,
                   v.user_id
            FROM sessions s
            JOIN visitors v ON v.id = s.visitor_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY started_at DESC
            LIMIT $${++paramCount} OFFSET $${++paramCount}
        `;

    params.push(limit, offset);
    const { rows } = await pool.query(query, params);
    return rows;
  },

  // Get session statistics
  async getSessionStats(tenant_id, { start_date, end_date } = {}) {
    let conditions = ["tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (start_date) {
      conditions.push(`started_at >= $${++paramCount}`);
      params.push(start_date);
    }

    if (end_date) {
      conditions.push(`started_at <= $${++paramCount}`);
      params.push(end_date);
    }

    const query = `
            SELECT 
                COUNT(*) as total_sessions,
                COUNT(CASE WHEN ended_at IS NULL THEN 1 END) as active_sessions,
                COUNT(CASE WHEN is_bounce THEN 1 END) as bounce_sessions,
                ROUND(AVG(CASE WHEN ended_at IS NOT NULL THEN duration_seconds END)) as avg_duration,
                ROUND(AVG(page_views)) as avg_page_views,
                COUNT(DISTINCT visitor_id) as unique_visitors,
                ROUND((COUNT(CASE WHEN is_bounce THEN 1 END)::FLOAT / COUNT(*) * 100)::numeric, 2) as bounce_rate
            FROM sessions
            WHERE ${conditions.join(" AND ")}
        `;

    const {
      rows: [stats],
    } = await pool.query(query, params);
    return stats;
  },
};
