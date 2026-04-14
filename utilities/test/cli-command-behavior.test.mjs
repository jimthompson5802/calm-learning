import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const cliPath = path.resolve("dist/index.js");
const mockFetchPath = path.resolve("test/helpers/mock-fetch.cjs");
const fixturesDir = path.resolve("fixtures");

async function runCliWithMock(args, options = {}) {
  const tempDir = await mkdtemp(path.join(os.tmpdir(), "calm-hub-cli-test-"));
  const requestsFile = path.join(tempDir, "request.json");
  const outFile = path.join(tempDir, "out.json");
  const env = {
    ...process.env,
    MOCK_FETCH_REQUESTS_FILE: requestsFile,
    MOCK_FETCH_RESPONSE_BODY: options.responseBody ?? '{"ok":true}',
    MOCK_FETCH_STATUS: String(options.responseStatus ?? 200),
    MOCK_FETCH_CONTENT_TYPE: options.responseContentType ?? "application/json"
  };

  if (options.responseLocation) {
    env.MOCK_FETCH_LOCATION = options.responseLocation;
  }

  const result = await execFileAsync(
    "node",
    ["--require", mockFetchPath, cliPath, ...args, "--out", outFile],
    { env }
  );

  const request = JSON.parse(await readFile(requestsFile, "utf8"));
  const out = await readFile(outFile, "utf8");

  return {
    stdout: result.stdout,
    stderr: result.stderr,
    request,
    out
  };
}

test("shared builder create command posts wrapped architecture payload to the expected endpoint", async () => {
  const result = await runCliWithMock([
    "architectures",
    "create",
    "--namespace",
    "finos",
    "--file",
    path.join(fixturesDir, "architecture.calm.json")
  ], {
    responseStatus: 201,
    responseLocation: "/calm/namespaces/finos/architectures/12/versions/1.0.0",
    responseBody: ""
  });

  assert.equal(result.request.method, "POST");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/architectures");
  const body = JSON.parse(result.request.body);
  assert.equal(body.name, "Trading Platform");
  assert.equal(body.description, "Core architecture");
  assert.equal(JSON.parse(body.architectureJson)["unique-id"], "trading-platform");

  const out = JSON.parse(result.out);
  assert.equal(out.action, "architectures.create");
  assert.equal(out.location, "/calm/namespaces/finos/architectures/12/versions/1.0.0");
});

test("shared builder get command uses the versioned resource route", async () => {
  const result = await runCliWithMock([
    "interfaces",
    "get",
    "--namespace",
    "finos",
    "--id",
    "7",
    "--version",
    "1.0.0"
  ]);

  assert.equal(result.request.method, "GET");
  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/interfaces/7/versions/1.0.0"
  );
});

test("shared builder create-version for standards sends wrapped request object", async () => {
  const result = await runCliWithMock([
    "standards",
    "create-version",
    "--namespace",
    "finos",
    "--id",
    "4",
    "--version",
    "1.0.1",
    "--file",
    path.join(fixturesDir, "standard.calm.json")
  ], {
    responseStatus: 201,
    responseLocation: "/calm/namespaces/finos/standards/4/versions/1.0.1",
    responseBody: ""
  });

  assert.equal(result.request.method, "POST");
  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/standards/4/versions/1.0.1"
  );
  const body = JSON.parse(result.request.body);
  assert.equal(body.name, "Example Standard");
  assert.equal(body.description, "Standard definition example");
  assert.equal(JSON.parse(body.standardJson).title, "Example Standard");
});

test("flows get uses the latest-flow endpoint", async () => {
  const result = await runCliWithMock([
    "flows",
    "get",
    "--namespace",
    "finos",
    "--id",
    "12"
  ]);

  assert.equal(result.request.method, "GET");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/flows/12");
});

test("flows get-version uses the versioned flow endpoint", async () => {
  const result = await runCliWithMock([
    "flows",
    "get-version",
    "--namespace",
    "finos",
    "--id",
    "12",
    "--version",
    "1.0.0"
  ]);

  assert.equal(result.request.method, "GET");
  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/flows/12/versions/1.0.0"
  );
});

test("flows create-version sends raw JSON instead of a wrapped request object", async () => {
  const result = await runCliWithMock([
    "flows",
    "create-version",
    "--namespace",
    "finos",
    "--id",
    "12",
    "--version",
    "1.0.1",
    "--file",
    path.join(fixturesDir, "flow.calm.json")
  ], {
    responseStatus: 201,
    responseLocation: "/calm/namespaces/finos/flows/12/versions/1.0.1",
    responseBody: ""
  });

  assert.equal(result.request.method, "POST");
  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/flows/12/versions/1.0.1"
  );
  const rawBody = result.request.body;
  const parsed = JSON.parse(rawBody);
  assert.equal(parsed.name, "Order Processing");
  assert.equal(parsed["unique-id"], "order-processing");
});

test("namespaces create supports --name and --description without a file", async () => {
  const result = await runCliWithMock([
    "namespaces",
    "create",
    "--name",
    "finos",
    "--description",
    "FINOS namespace"
  ], {
    responseStatus: 201,
    responseLocation: "/calm/namespaces/finos",
    responseBody: ""
  });

  assert.equal(result.request.method, "POST");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces");
  const body = JSON.parse(result.request.body);
  assert.deepEqual(body, {
    name: "finos",
    description: "FINOS namespace"
  });
});
