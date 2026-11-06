const { test } = require("node:test");
const assert = require("node:assert/strict");

const {
  normalizeWhatsAppNumber,
  buildWhatsAppOrderUrl,
} = require("../storefront-utils.js");

test("empty or invalid WhatsApp number is not usable", () => {
  assert.equal(normalizeWhatsAppNumber(""), null);
  assert.equal(normalizeWhatsAppNumber("call the shop"), null);
  assert.equal(buildWhatsAppOrderUrl("", "Order message"), null);
});

test("normalizes a formatted international WhatsApp number", () => {
  assert.equal(normalizeWhatsAppNumber("+91 98765-43210"), "919876543210");
});

test("encodes an order message into a WhatsApp click-to-chat URL", () => {
  const url = buildWhatsAppOrderUrl("+91 98765 43210", "Hi bakery\n1 x Croissant");
  assert.equal(
    url,
    "https://wa.me/919876543210?text=Hi%20bakery%0A1%20x%20Croissant",
  );
});

test("rejects an empty message", () => {
  assert.equal(buildWhatsAppOrderUrl("919876543210", "  "), null);
});
