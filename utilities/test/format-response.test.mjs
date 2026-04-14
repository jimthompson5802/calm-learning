import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { formatCommandOutput } = require("../dist/io/format-response.js");

test("201 responses are formatted with action, path, and location", () => {
  const result = formatCommandOutput(
    {
      status: 201,
      headers: {
        location: "/calm/namespaces/finos"
      },
      data: {
        status: 201,
        location: "/calm/namespaces/finos"
      }
    },
    {
      action: "namespaces.create",
      path: "/calm/namespaces"
    }
  );

  assert.deepEqual(result, {
    ok: true,
    action: "namespaces.create",
    status: 201,
    path: "/calm/namespaces",
    location: "/calm/namespaces/finos",
    data: null
  });
});

test("non-create responses pass through unchanged", () => {
  const payload = { values: [{ name: "finos" }] };
  const result = formatCommandOutput(
    {
      status: 200,
      headers: {},
      data: payload
    },
    {
      action: "namespaces.list",
      path: "/calm/namespaces"
    }
  );

  assert.equal(result, payload);
});
