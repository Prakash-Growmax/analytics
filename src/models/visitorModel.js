// src/models/visitorModel.js
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

export const VisitorModel = {
  async upsertVisitor({
    tenant_id,
    anonymous_id,
    user_id,
    device_info = {},
    browser_info = {},
    location = {},
    user_properties = {},
  }) {
    const client = await pool.connect();
    try {
      if (!tenant_id) {
        throw new Error("tenant_id must be provided");
      }
      // Check for existing visitor
      let existingVisitorQuery = `
                SELECT id, last_seen_at FROM visitors 
                WHERE tenant_id = $1 AND `;

      const queryParams = [tenant_id];

      if (anonymous_id) {
        existingVisitorQuery += "anonymous_id = $2";
        queryParams.push(anonymous_id);
      } else if (user_id) {
        existingVisitorQuery += "user_id = $2";
        queryParams.push(user_id);
      } else {
        throw new Error("Either anonymous_id or user_id must be provided");
      }

      const {
        rows: [existingVisitor],
      } = await client.query(existingVisitorQuery, queryParams);

      if (existingVisitor) {
        const updateQuery = `
                    UPDATE visitors 
                    SET 
                        user_id = COALESCE($1, user_id),
                        device_info = COALESCE($2, device_info),
                        browser_info = COALESCE($3, browser_info),
                        location = COALESCE($4, location),
                        user_properties = COALESCE($5, user_properties),
                        last_seen_at = CURRENT_TIMESTAMP
                    WHERE id = $6
                    RETURNING *
                `;
        const {
          rows: [updated],
        } = await client.query(updateQuery, [
          user_id,
          device_info,
          browser_info,
          location,
          user_properties,
          existingVisitor.id,
        ]);
        return updated;
      }

      // Create new visitor
      const insertQuery = `
                INSERT INTO visitors (
                    id,
                    tenant_id,
                    anonymous_id,
                    user_id,
                    device_info,
                    browser_info,
                    location,
                    user_properties,
                    first_seen_at,
                    last_seen_at
                )
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
                RETURNING *
            `;
      const {
        rows: [created],
      } = await client.query(insertQuery, [
        uuidv4(),
        tenant_id,
        anonymous_id,
        user_id,
        device_info,
        browser_info,
        location,
        user_properties,
      ]);
      return created;
    } finally {
      client.release();
    }
  },

  async getVisitorById(id, tenant_id) {
    const query = "SELECT * FROM visitors WHERE id = $1 AND tenant_id = $2";
    const {
      rows: [visitor],
    } = await pool.query(query, [id, tenant_id]);
    return visitor;
  },

  async listVisitors({
    tenant_id,
    limit = 50,
    offset = 0,
    user_id,
    anonymous_id,
    start_date,
    end_date,
  }) {
    const queryParams = [tenant_id];
    const conditions = ["tenant_id = $1"];

    if (user_id) {
      conditions.push(`user_id = $${queryParams.length + 1}`);
      queryParams.push(user_id);
    }

    if (anonymous_id) {
      conditions.push(`anonymous_id = $${queryParams.length + 1}`);
      queryParams.push(anonymous_id);
    }

    if (start_date) {
      conditions.push(`first_seen_at >= $${queryParams.length + 1}`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`first_seen_at <= $${queryParams.length + 1}`);
      queryParams.push(end_date);
    }

    const query = `
            SELECT 
                v.*,
                (
                    SELECT COUNT(*) 
                    FROM sessions s 
                    WHERE s.visitor_id = v.id
                ) as session_count,
                (
                    SELECT COUNT(*) 
                    FROM events e 
                    WHERE e.visitor_id = v.id
                ) as event_count
            FROM visitors v
            WHERE ${conditions.join(" AND ")}
            ORDER BY last_seen_at DESC 
            LIMIT $${queryParams.length + 1} 
            OFFSET $${queryParams.length + 2}
        `;

    queryParams.push(limit, offset);
    const { rows } = await pool.query(query, queryParams);
    return rows;
  },

  async deleteVisitor(id, tenant_id) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Delete related events first
      await client.query(
        "DELETE FROM events WHERE visitor_id = $1 AND tenant_id = $2",
        [id, tenant_id]
      );

      // Delete related sessions
      await client.query(
        "DELETE FROM sessions WHERE visitor_id = $1 AND tenant_id = $2",
        [id, tenant_id]
      );

      // Finally delete the visitor
      const query =
        "DELETE FROM visitors WHERE id = $1 AND tenant_id = $2 RETURNING *";
      const {
        rows: [deleted],
      } = await client.query(query, [id, tenant_id]);

      await client.query("COMMIT");
      return deleted;
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  },

  async getVisitorStats(tenant_id) {
    const query = `
            SELECT 
                COUNT(*) as total_visitors,
                COUNT(user_id) as identified_visitors,
                COUNT(CASE WHEN last_seen_at > NOW() - INTERVAL '24 hours' THEN 1 END) as active_last_24h,
                COUNT(CASE WHEN last_seen_at > NOW() - INTERVAL '7 days' THEN 1 END) as active_last_7d,
                COUNT(CASE WHEN last_seen_at > NOW() - INTERVAL '30 days' THEN 1 END) as active_last_30d
            FROM visitors
            WHERE tenant_id = $1
        `;
    const {
      rows: [stats],
    } = await pool.query(query, [tenant_id]);
    return stats;
  },
};
