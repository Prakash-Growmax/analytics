export const validateTenantInput = (data) => {
  const errors = [];

  // Domain validation
  const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!data.domain || !domainRegex.test(data.domain)) {
    errors.push("Invalid domain format");
  }

  // Name validation
  if (!data.name || data.name.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  // Settings validation
  if (data.settings && typeof data.settings !== "object") {
    errors.push("Settings must be a valid JSON object");
  }

  return errors;
};
