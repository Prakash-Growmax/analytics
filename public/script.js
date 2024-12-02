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
  };

  class ValidatedVisitorTracker {
    constructor() {
      const scriptUrl = new URL(currentScript.src);
      this.storageKey = "anonymous_visitor_id";
      this.storage_visitor_data = "storage_visitor_data";
      this.apiKey = scriptUrl.searchParams.get("key");
      this.tenantId = scriptUrl.searchParams.get("tid");
      this.isValidated = false;
      this.visitorData = null;
      this.anonymousId = null;

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
          return;
        }

        this.isValidated = true;
        await this.init();
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
        console.log(
          "🚀 ~ ValidatedVisitorTracker ~ validateApiKey ~ response:",
          response
        );

        if (!response.ok) {
          return false;
        }

        const result = await response.json();
        return result.data.valid === true;
      } catch (error) {
        console.error("API key validation failed:", error);
        return false;
      }
    }

    async generateDeviceInfo() {
      const screen = {
        width: window.screen.width,
        height: window.screen.height,
      };

      // Determine device type based on user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad|ipod/i.test(userAgent);

      return {
        type: isMobile ? "mobile" : "desktop",
        model: this.parseDeviceModel(userAgent),
        screen,
      };
    }

    getBrowserInfo() {
      const ua = navigator.userAgent;
      const browserInfo = {
        name: this.getBrowserName(ua),
        version: this.getBrowserVersion(ua),
        language: navigator.language,
        userAgent: ua,
      };
      return browserInfo;
    }

    getBrowserName(ua) {
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Safari")) return "Safari";
      if (ua.includes("Edge")) return "Edge";
      return "Unknown";
    }

    getBrowserVersion(ua) {
      const match = ua.match(/(chrome|firefox|safari|edge)\/(\d+(\.\d+)*)/i);
      return match ? match[2] : "Unknown";
    }

    parseDeviceModel(ua) {
      // Basic device model detection - expand as needed
      if (ua.includes("iphone")) {
        const match = ua.match(/iphone\s*(?:OS\s*)?(\d+)/i);
        return `iPhone ${match ? match[1] : ""}`;
      }
      if (ua.includes("android")) {
        return "Android Device";
      }
      return "Desktop";
    }

    getStoredId() {
      // Check localStorage first
      const localId = localStorage.getItem(this.storageKey);
      if (localId) return localId;

      // Fallback to sessionStorage
      const sessionId = sessionStorage.getItem(this.storageKey);
      if (sessionId) {
        // If found in session storage, also save to localStorage for persistence
        localStorage.setItem(this.storageKey, sessionId);
        return sessionId;
      }

      return null;
    }

    async generateNewId() {
      try {
        // Generate fingerprint-based ID
        const fpPromise = Fingerprint2.load({
          components: {
            screen: {
              width: window.screen.width,
              height: window.screen.height,
              depth: window.screen.colorDepth,
              devicePixelRatio: window.devicePixelRatio,
            },
          },
        });
        const fp = await fpPromise;
        const result = await fp.get();

        if (result?.visitorId) {
          return result.visitorId;
        }
      } catch (error) {
        console.warn(
          "Fingerprinting failed, using fallback ID generation",
          error
        );
        return this.generateFallbackId();
      }
    }

    storeId(id) {
      try {
        localStorage.setItem(this.storageKey, id);
        sessionStorage.setItem(this.storageKey, id);
      } catch (error) {
        console.warn("Failed to store anonymous ID", error);
      }
    }

    removeId() {
      try {
        localStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.storageKey);
      } catch (error) {
        console.warn("Failed to store anonymous ID", error);
      }
    }

    async registerVisitor(anonymousId) {
      if (JSON.parse(localStorage.getItem(this.storage_visitor_data))?.id) {
        return JSON.parse(localStorage.getItem(this.storage_visitor_data));
      }
      const payload = {
        anonymous_id: anonymousId,
        user_id: null, // Can be updated later if user logs in
        device_info: await this.generateDeviceInfo(),
        browser_info: this.getBrowserInfo(),
      };

      try {
        const response = await fetch(`${CONFIG.apiEndpoint}/visitors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": this.apiKey,
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          this.removeId();
          throw new Error(`API call failed: ${response.status}`);
        }
        const result = await response.json();
        localStorage.setItem(this.storage_visitor_data, JSON.stringify(result));
        sessionStorage.setItem(
          this.storage_visitor_data,
          JSON.stringify(result)
        );
        this.visitorData = result;
        return result;
      } catch (error) {
        this.removeId();
        console.error("Failed to register visitor:", error);
        throw error;
      }
    }

    async init() {
      if (!this.isValidated) return;

      try {
        let anonymousId = this.getStoredId();
        console.log(
          "🚀 ~ ValidatedVisitorTracker ~ init ~ anonymousId:",
          anonymousId
        );
        if (!anonymousId) {
          anonymousId = await this.generateNewId();
          this.storeId(anonymousId);
          await this.registerVisitor(anonymousId);
        }
        this.anonymousId = anonymousId;
        this.isInitialized = true;
        if (!this.anonymousId) {
          return;
        }
      } catch (error) {
        console.error("Tracking initialization failed:", error);
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
