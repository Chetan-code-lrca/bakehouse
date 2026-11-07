const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

class FakeElement {
  constructor() {
    this.children = [];
    this.attributes = {};
    this.textContent = "";
    this.innerHTML = "";
    this.value = "";
    this.className = "";
    this.href = "";
    this.target = "";
    this.rel = "";
    this.onclick = null;
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }
}

function loadApp() {
  const ids = [
    "status", "chips", "items", "cart", "total", "note",
    "cname", "hours", "addr", "contact", "send",
  ];
  const elements = new Map(ids.map((id) => [id, new FakeElement()]));
  const document = {
    getElementById(id) {
      if (!elements.has(id)) throw new Error(`Unexpected element id: ${id}`);
      return elements.get(id);
    },
    createElement() {
      return new FakeElement();
    },
  };

  const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");
  vm.runInNewContext(source, {
    document,
    setInterval() {},
    Date,
    encodeURIComponent,
  });

  return elements;
}

test("checkout stays disabled until a real WhatsApp number is configured", () => {
  const elements = loadApp();
  const send = elements.get("send");

  assert.equal(send.href, "#");
  assert.equal(send.attributes["aria-disabled"], "true");
  assert.match(elements.get("contact").textContent, /not been configured/);

  const firstItem = elements.get("items").children[0];
  const addButton = firstItem.children[2];
  addButton.onclick();

  assert.equal(send.href, "#");
  assert.equal(send.attributes["aria-disabled"], "true");
  assert.match(elements.get("note").textContent, /WhatsApp ordering is not configured/);
});

test("disabled checkout prevents navigation when clicked", () => {
  const elements = loadApp();
  let prevented = false;

  elements.get("send").onclick({
    preventDefault() {
      prevented = true;
    },
  });

  assert.equal(prevented, true);
});

test("no placeholder WhatsApp number or display phone is committed", () => {
  const source = fs.readFileSync(path.join(__dirname, "..", "script.js"), "utf8");

  assert.equal(source.includes("919999999999"), false);
  assert.equal(source.includes("+91 99999 99999"), false);
});
