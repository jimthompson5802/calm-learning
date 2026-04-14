import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { toArchitectureCreateRequest } = require("../dist/transformers/architecture-payload.js");
const {
  toJsonResourceCreateRequest,
  extractWrappedJsonString
} = require("../dist/transformers/json-resource-payload.js");

const fixturesDir = path.resolve("fixtures");

async function readFixture(name) {
  const file = await readFile(path.join(fixturesDir, name), "utf8");
  return JSON.parse(file);
}

test("plain CALM JSON is converted to architectureJson and keeps top-level metadata", async () => {
  const input = await readFixture("architecture.calm.json");
  const result = toArchitectureCreateRequest(input);

  assert.equal(result.name, "Trading Platform");
  assert.equal(result.description, "Core architecture");
  assert.equal(JSON.parse(result.architectureJson)["unique-id"], "trading-platform");
});

test("wrapped payload is passed through when architectureJson is valid JSON", async () => {
  const input = await readFixture("architecture-wrapped.json");
  const result = toArchitectureCreateRequest(input);

  assert.equal(result.name, "Trading Platform");
  assert.equal(result.description, "Core architecture");
  assert.equal(JSON.parse(result.architectureJson).name, "Trading Platform");
});

test("wrapped payload rejects invalid architectureJson", async () => {
  const input = await readFixture("architecture-invalid-wrapped.json");
  assert.throws(() => toArchitectureCreateRequest(input), /invalid JSON in "architectureJson"/);
});

test("explicit overrides take precedence over plain file values", async () => {
  const input = await readFixture("architecture.calm.json");
  const result = toArchitectureCreateRequest(input, {
    name: "Override Name",
    description: "Override Description"
  });

  assert.equal(result.name, "Override Name");
  assert.equal(result.description, "Override Description");
});

test("generic payload transformer can map to patternJson", async () => {
  const input = await readFixture("pattern.calm.json");
  const result = toJsonResourceCreateRequest(input, {
    payloadTypeName: "Pattern",
    jsonField: "patternJson"
  });

  assert.equal(result.name, "Shared Pattern");
  assert.equal(result.description, "Reusable implementation pattern");
  assert.equal(JSON.parse(result.patternJson)["unique-id"], "shared-pattern");
});

test("generic payload transformer can extract wrapped json string for raw version endpoints", async () => {
  const input = await readFixture("flow.calm.json");
  const result = extractWrappedJsonString(
    input,
    {
      payloadTypeName: "Flow",
      jsonField: "flowJson"
    },
    {
      name: "Override Flow",
      description: "Override flow description"
    }
  );

  assert.equal(JSON.parse(result).name, "Order Processing");
});
