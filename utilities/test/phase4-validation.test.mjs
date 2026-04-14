import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";

const execFileAsync = promisify(execFile);
const cliPath = path.resolve("dist/index.js");

async function expectFailure(args, pattern) {
  await assert.rejects(
    execFileAsync("node", [cliPath, ...args]),
    (error) => {
      assert.notEqual(error.code, 0);
      assert.match(error.stderr ?? "", pattern);
      return true;
    }
  );
}

test("domains create fails for invalid domain names", async () => {
  await expectFailure(["domains", "create", "--name", "sec_ops"], /Domain must match pattern/);
});

test("adrs get-revision fails for non-positive revisions", async () => {
  await expectFailure(
    ["adrs", "get-revision", "--namespace", "finos", "--id", "2", "--revision", "0"],
    /ADR revision must be a positive integer/
  );
});

test("adrs status fails for invalid statuses", async () => {
  await expectFailure(
    ["adrs", "status", "--namespace", "finos", "--id", "2", "--status", "archived"],
    /ADR status must be one of/
  );
});

test("decorators list fails for whitespace in type filter", async () => {
  await expectFailure(
    ["decorators", "list", "--namespace", "finos", "--type", "deploy ment"],
    /Decorator type must match pattern/
  );
});

test("controls configuration-versions fails for non-positive config ids", async () => {
  await expectFailure(
    ["controls", "configuration-versions", "--domain", "security", "--id", "5", "--config-id", "0"],
    /Configuration id must be a positive integer/
  );
});
