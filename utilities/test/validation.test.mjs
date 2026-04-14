import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { assertIntegerId, assertNamespace, assertVersion } = require("../dist/validation.js");

test("assertIntegerId rejects partially numeric ids", () => {
  assert.throws(() => assertIntegerId("12abc"), /non-negative integer/);
});

test("assertIntegerId accepts digit-only ids", () => {
  assert.equal(assertIntegerId("12"), "12");
});

test("assertNamespace rejects invalid namespace characters", () => {
  assert.throws(() => assertNamespace("fin_os"), /Namespace must match pattern/);
});

test("assertVersion rejects invalid versions", () => {
  assert.throws(() => assertVersion("1.0.invalid"), /Version must match pattern/);
});
