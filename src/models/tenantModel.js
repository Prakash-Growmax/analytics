import pool from "../config/db.js";
import { generateApiKey, getHasedKey } from "../utils/keyGenerator.js"; // Adjust the path accordingly
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
        hashedKey: hashedKey,
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

  static async verifyApiKey(tenantId, apiKey) {
    const client = await pool.connect();

    try {
      // Generate hash of the provided API key
      const hash = getHasedKey(apiKey);

      // Query to find tenant and matching API key
      const result = await client.query(
        `SELECT 
            t.id as tenant_id,
            t.name as tenant_name,
            t.settings as tenant_settings,
            ak.key_name,
            ak.permissions,
            ak.created_at,
            ak.expires_at,
            ak.rate_limit,
            ak.last_used_at,
            ak.allowed_ips
        FROM tenants t
        INNER JOIN api_keys ak ON ak.tenant_id = t.id
        WHERE t.id = $1 
        AND ak.api_key = $2 
        AND ak.status = 'active'
        AND (ak.expires_at IS NULL OR ak.expires_at > CURRENT_TIMESTAMP)`,
        [tenantId, hash]
      );
      if (result.rows.length === 0) {
        return { isValid: false };
      }

      const row = result.rows[0];

      // Update last_used_at
      await client.query(
        `UPDATE api_keys 
         SET last_used_at = CURRENT_TIMESTAMP 
         WHERE tenant_id = $1 AND api_key = $2`,
        [tenantId, hash]
      );
      return {
        isValid: true,
        tenant: {
          id: row.tenant_id,
          name: row.tenant_name,
          settings: row.tenant_settings,
        },
        keyDetails: {
          name: row.key_name,
          permissions: row.permissions,
          createdAt: row.created_at,
          expiresAt: row.expires_at,
          rateLimit: row.rate_limit,
          lastUsedAt: row.last_used_at,
          allowedIps: row.allowed_ips,
        },
      };
    } catch (error) {
      throw new Error(`API key verification failed: ${error.message}`);
    } finally {
      client.release();
    }
  }
}

export default TenantModel;
