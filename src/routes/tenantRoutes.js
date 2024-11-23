import express from "express";
import { authenticateAdmin, validateApiKey } from "../middleware/auth.js"; // Added .js extension
import TenantModel from "../models/tenantModel.js";
const router = express.Router();

router.post("/tenants", authenticateAdmin, async (req, res) => {
  try {
    const result = await TenantModel.create(req.body);
    res.status(201).json({
      message: "Tenant created successfully",
      data: {
        tenant: result.tenant,
        apiKey: result.apiKey,
      },
    });
  } catch (error) {
    console.error("Tenant creation error:", error);
    res.status(400).json({
      error: "Failed to create tenant",
      details: error.message,
    });
  }
});

router.post(
  "/tenants/:tenant_id/api-keys",
  authenticateAdmin,
  async (req, res) => {
    try {
      const { tenant_id } = req.params;
      const { keyName, permissions } = req.body;

      const result = await TenantModel.createApiKey(
        tenant_id,
        keyName,
        permissions
      );
      res.status(201).json({
        message: "API key created successfully",
        data: {
          apiKey: result.apiKey, // This key will be shown only once
          details: result.details,
        },
      });
    } catch (error) {
      console.error("API key creation error:", error);
      res.status(400).json({
        error: "Failed to create API key",
        details: error.message,
      });
    }
  }
);

router.post("/verify-api-key", validateApiKey, async (req, res) => {
  try {
    const { isValidApikey, tenant_id } = req;
    // Check for required fields
    if (!isValidApikey) {
      return res.status(401).json({
        error: "Invalid API key",
        data: {
          valid: false,
          tenant_id,
        },
      });
    }

    // Success response
    res.status(200).json({
      message: "API key verified successfully",
      data: {
        valid: true,
        tenant_id,
      },
    });
  } catch (error) {
    console.error("API key verification error:", error);
    res.status(500).json({
      error: "Failed to verify API key",
      details: error.message,
    });
  }
});

export default router;
