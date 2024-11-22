import crypto from "crypto";
import pool from "../config/db.js";

export const validateApiKey = async (req, res, next) => {
  const apiKey = req.header("X-API-Key");
  if (!apiKey) {
    return res.status(401).json({ error: "API key required" });
  }

  try {
    const keyHash = crypto.createHash("sha256").update(apiKey).digest("hex");
    const result = await pool.query(
      "SELECT tenant_id, permissions FROM api_keys WHERE api_key = $1 AND status = 'active'",
      [keyHash]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid API key" });
    }

    req.tenant_id = result.rows[0].tenant_id;
    console.log("🚀 ~ validateApiKey ~ req.tenant_id :", req.tenant_id);
    req.permissions = result.rows[0].permissions;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const authenticateAdmin = async (req, res, next) => {
  const adminToken = req.header("X-Admin-Token");
  if (!adminToken || adminToken !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
