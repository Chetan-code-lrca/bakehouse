(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.BakehouseUtils = api;
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function normalizeWhatsAppNumber(value) {
    const number = String(value || "").replace(/[+\s().-]/g, "");
    return /^\d{8,15}$/.test(number) ? number : null;
  }

  function buildWhatsAppOrderUrl(number, message) {
    const normalized = normalizeWhatsAppNumber(number);
    if (!normalized || typeof message !== "string" || !message.trim()) {
      return null;
    }
    return "https://wa.me/" + normalized + "?text=" + encodeURIComponent(message);
  }

  return { normalizeWhatsAppNumber, buildWhatsAppOrderUrl };
});
