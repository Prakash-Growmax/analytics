import pool from "../config/db.js";
import { generateApiKey } from "../utils/keyGenerator.js"; // Adjust the path accordingly
import { validateTenantInput } from "../validators/tenantValidator.js"; // Use import instead of require

class TenantModel {
  static async create(data) {
    const errors = validateTenantInput(data);
    if (errors.length > 0) {
      throw new Error(errors.join(", "));
    }

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Create tenant
      const tenantResult = await client.query(
        `INSERT INTO tenants (domain, name, settings, status)
         VALUES ($1, $2, $3, $4)
         RETURNING id, domain, name, status, created_at`,
        [data.domain, data.name, data.settings || {}, "active"]
      );

      // Generate initial API key
      const { rawKey, prefix, hashedKey } = generateApiKey();

      // Store API key
      await client.query(
        `INSERT INTO api_keys (
          tenant_id, key_name, api_key, raw_key_prefix,
          permissions, rate_limit, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          tenantResult.rows[0].id,
          "Default API Key",
          hashedKey,
          prefix,
          { read: true, write: true },
          1000,
          "active",
        ]
      );

      await client.query("COMMIT");

      return {
        tenant: tenantResult.rows[0],
        apiKey: rawKey, // Return raw key - it will be shown only once
      };
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async createApiKey(tenant_id, keyName, permissions = null) {
    const client = await pool.connect();
    try {
      // Generate new API key
      const { rawKey, prefix, hashedKey } = generateApiKey();

      // Store new API key
      const result = await client.query(
        `INSERT INTO api_keys (
          tenant_id, key_name, api_key, raw_key_prefix,
          permissions, rate_limit, status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, key_name, created_at, status`,
        [
          tenant_id,
          keyName,
          hashedKey,
          prefix,
          permissions || { read: true, write: true },
          1000,
          "active",
        ]
      );

      return {
        apiKey: rawKey, // Return raw key - will be shown only once
        details: result.rows[0],
      };
    } finally {
      client.release();
    }
  }
}

export default TenantModel;
