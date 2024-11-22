import crypto from "crypto";

export const generateApiKey = () => {
  // Generate a random 32-byte hex string
  const rawKey = crypto.randomBytes(32).toString("hex");
  // Take first 8 characters as prefix for identification
  const prefix = rawKey.slice(0, 8);
  // Add prefix to make the final API key format: prefix.remainder
  const apiKey = `${prefix}.${rawKey}`;
  // Take first 8 characters as prefix for identification
  // Hash the full key for storage
  const hashedKey = crypto.createHash("sha256").update(apiKey).digest("hex");

  return {
    rawKey, // Full API key to be shown only once to user
    prefix, // Stored to help identify keys
    hashedKey, // Stored in database
  };
};
