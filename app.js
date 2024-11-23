// ... existing code ...
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import config from "./src/config/config.js";
import pool from "./src/config/db.js";
import { validateApiKey } from "./src/middleware/auth.js";
import analyticsRoutes from "./src/routes/analytics.js";
import eventRoutes from "./src/routes/eventRoutes.js";
import pageViewRoutes from "./src/routes/pageViewRoutes.js";
import productInteractionRoutes from "./src/routes/productInteractionRoutes.js";
import searchEventRoutes from "./src/routes/searchEventRoutes.js";
import sessionRoutes from "./src/routes/sessionRoutes.js";
import tenantRoutes from "./src/routes/tenantRoutes.js";
import visitorRoutes from "./src/routes/visitorRoutes.js";

dotenv.config();
const app = express();

app.use(helmet()); // Adds various HTTP headers for security
app.use(express.json());
app.use(cors(config.corsOptions));

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.environment !== "test") {
  app.use(morgan("dev")); // Log requests only in non-test environment
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files with proper CORS and caching headers
app.use(
  "/static",
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      // Enable CORS
      res.setHeader("Access-Control-Allow-Origin", "*");

      // Set caching headers
      if (path.endsWith(".js")) {
        res.setHeader("Cache-Control", "public, max-age=86400"); // 24 hours
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/script.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "script.js"));
});

// Health check endpoint
app.get("/health", async (req, res) => {
  const startTime = Date.now();
  try {
    // Test database connection
    const result = await pool.query("SELECT NOW()");
    const responseTime = Date.now() - startTime;

    res.json({
      status: "healthy",
      database: {
        status: "connected",
        responseTime: `${responseTime}ms`,
        timestamp: result.rows[0].now,
      },
      api: {
        status: "running",
        uptime: process.uptime(),
      },
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    res.status(503).json({
      status: "unhealthy",
      database: {
        status: "disconnected",
        error: error.message,
      },
      api: {
        status: "running",
        uptime: process.uptime(),
      },
    });
  }
});

// Apply API key validation to all analytics routes
app.use("/api", tenantRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/page-views", pageViewRoutes);
app.use("/api/product-interactions", productInteractionRoutes);
app.use("/api/search-events", searchEventRoutes);
app.use("/api/analytics", validateApiKey, analyticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource was not found",
  });
});

app.listen(config.port, async () => {
  console.log(`Server running on port ${config.port}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received. Closing server...");
  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
