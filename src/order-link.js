(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.BakehouseOrderLink = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function createWhatsAppOrderLink(number, message) {
    const digits = String(number ?? "").replace(/\D/g, "");
    if (!/^\d{8,15}$/.test(digits)) return null;
    return "https://wa.me/" + digits + "?text=" + encodeURIComponent(String(message ?? ""));
  }

  return Object.freeze({ createWhatsAppOrderLink });
});
