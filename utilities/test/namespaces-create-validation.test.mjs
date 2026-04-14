import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const cliPath = path.resolve("dist/index.js");

async function expectFailure(args, messagePattern) {
  await assert.rejects(
    execFileAsync("node", [cliPath, ...args]),
    (error) => {
      assert.notEqual(error.code, 0);
      const stderr = error.stderr ?? "";
      assert.match(stderr, messagePattern);
      return true;
    }
  );
}

test("namespaces create fails when only --name is provided", async () => {
  await expectFailure(
    ["namespaces", "create", "--name", "finos"],
    /requires both "--name" and "--description"/
  );
});

test("namespaces create fails when only --description is provided", async () => {
  await expectFailure(
    ["namespaces", "create", "--description", "FINOS namespace"],
    /requires both "--name" and "--description"/
  );
});

test("namespaces create fails when flags are mixed with --file", async () => {
  await expectFailure(
    [
      "namespaces",
      "create",
      "--file",
      path.resolve("fixtures/namespace.json"),
      "--name",
      "finos"
    ],
    /Use either "--file" or "--name" with "--description", but not both/
  );
});
