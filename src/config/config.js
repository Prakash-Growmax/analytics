import dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env file from project root
dotenv.config({ path: join(__dirname, "../../.env") });

const config = {
  port: process.env.PORT || 3000,
  database: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  },
  adminToken: process.env.ADMIN_SECRET_TOKEN,
  environment: process.env.NODE_ENV || "development",
  corsOptions: {
    origin: process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "X-API-Key", "X-Admin-Token"],
  },
};

// // Validate required configuration
// const validateConfig = () => {
//   const required = {
//     "Database URL": config.database.url,
//     "Admin Token": config.adminToken,
//   };

//   const missing = Object.entries(required)
//     .filter(([_, value]) => !value)
//     .map(([key]) => key);

//   if (missing.length > 0) {
//     console.error("❌ Missing required configuration:", missing.join(", "));
//     console.error("Please check your .env file");
//     process.exit(1);
//   }

//   console.log("✅ Configuration validated successfully");
// };

// validateConfig();

export default config;
