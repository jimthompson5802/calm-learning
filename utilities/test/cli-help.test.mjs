import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const cliPath = path.resolve("dist/index.js");

test("top-level help includes the new resource families", async () => {
  const { stdout } = await execFileAsync("node", [cliPath, "--help"]);

  assert.match(stdout, /\bpatterns\b/);
  assert.match(stdout, /\binterfaces\b/);
  assert.match(stdout, /\bstandards\b/);
  assert.match(stdout, /\bflows\b/);
});

test("flows help exposes both latest and versioned get commands", async () => {
  const { stdout } = await execFileAsync("node", [cliPath, "flows", "--help"]);

  assert.match(stdout, /\bget\b/);
  assert.match(stdout, /\bget-version\b/);
});
