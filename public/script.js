// visitor-tracker-url.js

(function () {
  // First, get current script tag to extract parameters
  const currentScript = document.currentScript;
  if (!currentScript) return;

  // Parse URL parameters from script src
  const scriptUrl = new URL(currentScript.src);
  const apiKey = scriptUrl.searchParams.get("key");
  const tenantId = scriptUrl.searchParams.get("tid");

  // Validate required parameters
  if (!apiKey || !tenantId) {
    console.error("Visitor Tracker: API key and tenant ID are required");
    return;
  }

  // Configuration
  const CONFIG = {
    apiEndpoint: "http://localhost:3000/api",
    fpScriptUrl:
      "https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js",
  };

  class ValidatedVisitorTracker {
    constructor() {
      const scriptUrl = new URL(currentScript.src);
      this.apiKey = scriptUrl.searchParams.get("key");
      this.tenantId = scriptUrl.searchParams.get("tid");
      this.isValidated = false;
      this.visitorData = null;

      // Validate parameters before initialization
      if (!this.apiKey || !this.tenantId) {
        console.error("Visitor Tracker: API key and tenant ID are required");
        return;
      }

      this.validateAndInit();
    }

    async validateAndInit() {
      try {
        // Validate API key and tenant ID
        const isValid = await this.validateApiKey();
        if (!isValid) {
          console.error("Visitor Tracker: Invalid API key or tenant ID");
          return;
        }

        this.isValidated = true;
        console.log("API key and tenants are valid...");
        // await this.init();
      } catch (error) {
        console.error("Visitor Tracker: Validation failed", error);
      }
    }
    async validateApiKey() {
      try {
        const response = await fetch(`${CONFIG.apiEndpoint}/verify-api-key`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": this.apiKey,
          },
          body: JSON.stringify({
            apiKey: this.apiKey,
            tenant_id: this.tenantId,
          }),
        });

        if (!response.ok) {
          return false;
        }

        const result = await response.json();
        return result.isValid === true;
      } catch (error) {
        console.error("API key validation failed:", error);
        return false;
      }
    }
  }

  // Create global tracker instance
  window._visitorTracker = new ValidatedVisitorTracker();

  // Expose update user ID method globally
  window.updateVisitorUserId = function (userId) {
    if (window._visitorTracker) {
      window._visitorTracker.updateUserId(userId);
    }
  };
})();
