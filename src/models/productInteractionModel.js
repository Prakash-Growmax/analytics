// src/models/productInteractionModel.js
import { v4 as uuidv4 } from "uuid";
import pool from "../config/db.js";

const VALID_INTERACTION_TYPES = [
  "view",
  "click",
  "add_to_cart",
  "remove_from_cart",
  "add_to_wishlist",
];

export const ProductInteractionModel = {
  // Create new product interaction
  async createInteraction({
    event_id,
    product_id,
    category_id,
    interaction_type,
    position,
    price,
    quantity,
    list_type,
    properties = {},
  }) {
    // Validate interaction type
    if (!VALID_INTERACTION_TYPES.includes(interaction_type)) {
      throw new Error(
        `Invalid interaction_type. Must be one of: ${VALID_INTERACTION_TYPES.join(
          ", "
        )}`
      );
    }

    const query = `
            INSERT INTO product_interactions (
                id,
                event_id,
                product_id,
                category_id,
                interaction_type,
                position,
                price,
                quantity,
                list_type,
                properties
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *
        `;

    const {
      rows: [interaction],
    } = await pool.query(query, [
      uuidv4(),
      event_id,
      product_id,
      category_id,
      interaction_type,
      position,
      price,
      quantity || 1,
      list_type,
      properties,
    ]);

    return interaction;
  },

  // Get interaction by ID
  async getInteractionById(id, tenant_id) {
    const query = `
            SELECT pi.*, 
                   e.tenant_id,
                   e.visitor_id,
                   e.session_id,
                   e.occurred_at,
                   e.page_url,
                   v.anonymous_id,
                   v.user_id
            FROM product_interactions pi
            JOIN events e ON e.id = pi.event_id
            JOIN visitors v ON v.id = e.visitor_id
            WHERE pi.id = $1 AND e.tenant_id = $2
        `;
    const {
      rows: [interaction],
    } = await pool.query(query, [id, tenant_id]);
    return interaction;
  },

  // List interactions
  async listInteractions({
    tenant_id,
    product_id,
    category_id,
    interaction_type,
    visitor_id,
    session_id,
    list_type,
    start_date,
    end_date,
    limit = 50,
    offset = 0,
  }) {
    const conditions = ["e.tenant_id = $1"];
    const params = [tenant_id];
    let paramCount = 1;

    if (product_id) {
      conditions.push(`pi.product_id = $${++paramCount}`);
      params.push(product_id);
    }

    if (category_id) {
      conditions.push(`pi.category_id = $${++paramCount}`);
      params.push(category_id);
    }

    if (interaction_type) {
      conditions.push(`pi.interaction_type = $${++paramCount}`);
      params.push(interaction_type);
    }

    if (visitor_id) {
      conditions.push(`e.visitor_id = $${++paramCount}`);
      params.push(visitor_id);
    }

    if (session_id) {
      conditions.push(`e.session_id = $${++paramCount}`);
      params.push(session_id);
    }

    if (list_type) {
      conditions.push(`pi.list_type = $${++paramCount}`);
      params.push(list_type);
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
            SELECT pi.*, 
                   e.tenant_id,
                   e.visitor_id,
                   e.session_id,
                   e.occurred_at,
                   e.page_url,
                   v.anonymous_id,
                   v.user_id
            FROM product_interactions pi
            JOIN events e ON e.id = pi.event_id
            JOIN visitors v ON v.id = e.visitor_id
            WHERE ${conditions.join(" AND ")}
            ORDER BY e.occurred_at DESC
            LIMIT $${++paramCount} OFFSET $${++paramCount}
        `;

    params.push(limit, offset);
    const { rows } = await pool.query(query, params);
    return rows;
  },

  // Get product interaction statistics
  async getInteractionStats(
    tenant_id,
    { start_date, end_date, product_id, category_id } = {}
  ) {
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

    if (product_id) {
      conditions.push(`pi.product_id = $${++paramCount}`);
      params.push(product_id);
    }

    if (category_id) {
      conditions.push(`pi.category_id = $${++paramCount}`);
      params.push(category_id);
    }

    const query = `
            SELECT 
                pi.interaction_type,
                COUNT(*) as total_count,
                COUNT(DISTINCT e.visitor_id) as unique_visitors,
                COUNT(DISTINCT e.session_id) as unique_sessions,
                COUNT(DISTINCT pi.product_id) as unique_products,
                ROUND(AVG(pi.price)::numeric, 2) as avg_price,
                SUM(pi.quantity) as total_quantity,
                jsonb_agg(DISTINCT pi.list_type) as list_types
            FROM product_interactions pi
            JOIN events e ON e.id = pi.event_id
            WHERE ${conditions.join(" AND ")}
            GROUP BY pi.interaction_type
            ORDER BY total_count DESC
        `;

    const { rows } = await pool.query(query, params);
    return rows;
  },

  // Get product performance metrics
  async getProductPerformance(
    tenant_id,
    { start_date, end_date, limit = 10 } = {}
  ) {
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

    params.push(limit);
    const query = `
            SELECT 
                pi.product_id,
                pi.category_id,
                COUNT(*) FILTER (WHERE pi.interaction_type = 'view') as view_count,
                COUNT(*) FILTER (WHERE pi.interaction_type = 'click') as click_count,
                COUNT(*) FILTER (WHERE pi.interaction_type = 'add_to_cart') as add_to_cart_count,
                COUNT(*) FILTER (WHERE pi.interaction_type = 'add_to_wishlist') as wishlist_count,
                COUNT(DISTINCT e.visitor_id) as unique_visitors,
                ROUND(AVG(pi.price)::numeric, 2) as avg_price,
                ROUND((COUNT(*) FILTER (WHERE pi.interaction_type = 'click')::float / 
                       NULLIF(COUNT(*) FILTER (WHERE pi.interaction_type = 'view'), 0) * 100)::numeric, 2) as click_through_rate,
                ROUND((COUNT(*) FILTER (WHERE pi.interaction_type = 'add_to_cart')::float / 
                       NULLIF(COUNT(*) FILTER (WHERE pi.interaction_type = 'view'), 0) * 100)::numeric, 2) as add_to_cart_rate
            FROM product_interactions pi
            JOIN events e ON e.id = pi.event_id
            WHERE ${conditions.join(" AND ")}
            GROUP BY pi.product_id, pi.category_id
            ORDER BY view_count DESC
            LIMIT $${++paramCount}
        `;

    const { rows } = await pool.query(query, params);
    return rows;
  },
};
