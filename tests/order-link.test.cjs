const assert = require("node:assert/strict");
const test = require("node:test");
const { createWhatsAppOrderLink } = require("../src/order-link.js");

test("does not create an order link when the shop number is missing", () => {
  assert.equal(createWhatsAppOrderLink("", "Hello"), null);
  assert.equal(createWhatsAppOrderLink(null, "Hello"), null);
});

test("rejects numbers outside the international digit-length range", () => {
  assert.equal(createWhatsAppOrderLink("1234567", "Hello"), null);
  assert.equal(createWhatsAppOrderLink("1234567890123456", "Hello"), null);
  assert.equal(createWhatsAppOrderLink("not-a-number", "Hello"), null);
});

test("normalizes formatting and URL-encodes the order message", () => {
  const link = createWhatsAppOrderLink("+91 98765-43210", "Hi bakery, I want 2 buns & tea");
  assert.equal(
    link,
    "https://wa.me/919876543210?text=Hi%20bakery%2C%20I%20want%202%20buns%20%26%20tea"
  );
});

test("does not append credentials or arbitrary URL fragments", () => {
  const link = createWhatsAppOrderLink("919876543210", "order");
  assert.equal(link.startsWith("https://wa.me/919876543210?text="), true);
  assert.equal(link.includes("#"), false);
});
