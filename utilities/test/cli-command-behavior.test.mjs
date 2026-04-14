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

test("domains create posts a simple name payload", async () => {
  const result = await runCliWithMock(
    ["domains", "create", "--name", "security"],
    {
      responseStatus: 201,
      responseLocation: "/calm/domains/security",
      responseBody: ""
    }
  );

  assert.equal(result.request.method, "POST");
  assert.equal(result.request.url, "http://localhost:8080/calm/domains");
  assert.deepEqual(JSON.parse(result.request.body), { name: "security" });
});

test("domains list uses the domains route", async () => {
  const result = await runCliWithMock(["domains", "list"]);
  assert.equal(result.request.method, "GET");
  assert.equal(result.request.url, "http://localhost:8080/calm/domains");
});

test("adrs create posts the ADR request object to the namespace route", async () => {
  const result = await runCliWithMock(
    ["adrs", "create", "--namespace", "finos", "--file", path.join(fixturesDir, "adr.json")],
    {
      responseStatus: 201,
      responseLocation: "/calm/namespaces/finos/adrs/2/revisions/1",
      responseBody: ""
    }
  );

  assert.equal(result.request.method, "POST");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/adrs");
  assert.equal(JSON.parse(result.request.body).title, "Use OAuth2");
});

test("adrs get-revision uses the revision-specific route", async () => {
  const result = await runCliWithMock([
    "adrs",
    "get-revision",
    "--namespace",
    "finos",
    "--id",
    "2",
    "--revision",
    "3"
  ]);

  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/adrs/2/revisions/3");
});

test("adrs status posts to the status route", async () => {
  const result = await runCliWithMock(
    ["adrs", "status", "--namespace", "finos", "--id", "2", "--status", "accepted"],
    {
      responseStatus: 201,
      responseLocation: "/calm/namespaces/finos/adrs/2/revisions/4",
      responseBody: ""
    }
  );

  assert.equal(result.request.method, "POST");
  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/adrs/2/status/accepted"
  );
});

test("adrs get uses the latest revision route", async () => {
  const result = await runCliWithMock(["adrs", "get", "--namespace", "finos", "--id", "2"]);
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/adrs/2");
});

test("adrs revisions uses the revisions route", async () => {
  const result = await runCliWithMock(["adrs", "revisions", "--namespace", "finos", "--id", "2"]);
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/adrs/2/revisions");
});

test("adrs update posts to the ADR update route", async () => {
  const result = await runCliWithMock(
    ["adrs", "update", "--namespace", "finos", "--id", "2", "--file", path.join(fixturesDir, "adr.json")],
    {
      responseStatus: 201,
      responseLocation: "/calm/namespaces/finos/adrs/2/revisions/2",
      responseBody: ""
    }
  );

  assert.equal(result.request.method, "POST");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/adrs/2");
});

test("decorators list includes both target and type filters when provided", async () => {
  const result = await runCliWithMock([
    "decorators",
    "list",
    "--namespace",
    "finos",
    "--target",
    "/calm/namespaces/finos/architectures/1/versions/1-0-0",
    "--type",
    "deployment"
  ]);

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/decorators?target=%2Fcalm%2Fnamespaces%2Ffinos%2Farchitectures%2F1%2Fversions%2F1-0-0&type=deployment"
  );
});

test("decorators list includes only the target filter when requested", async () => {
  const result = await runCliWithMock([
    "decorators",
    "list",
    "--namespace",
    "finos",
    "--target",
    "/calm/namespaces/finos/architectures/1/versions/1-0-0"
  ]);

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/decorators?target=%2Fcalm%2Fnamespaces%2Ffinos%2Farchitectures%2F1%2Fversions%2F1-0-0"
  );
});

test("decorators list includes only the type filter when requested", async () => {
  const result = await runCliWithMock([
    "decorators",
    "list",
    "--namespace",
    "finos",
    "--type",
    "deployment"
  ]);

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/namespaces/finos/decorators?type=deployment"
  );
});

test("decorators values uses the values route", async () => {
  const result = await runCliWithMock([
    "decorators",
    "values",
    "--namespace",
    "finos"
  ]);

  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/decorators/values");
});

test("decorators create sends raw JSON body", async () => {
  const result = await runCliWithMock(
    ["decorators", "create", "--namespace", "finos", "--file", path.join(fixturesDir, "decorator.json")],
    {
      responseStatus: 201,
      responseLocation: "/calm/namespaces/finos/decorators/9",
      responseBody: "{\"id\":9}"
    }
  );

  assert.equal(result.request.method, "POST");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/decorators");
  assert.equal(JSON.parse(result.request.body).type, "deployment");
});

test("decorators update uses PUT with the decorator id route", async () => {
  const result = await runCliWithMock(
    [
      "decorators",
      "update",
      "--namespace",
      "finos",
      "--id",
      "9",
      "--file",
      path.join(fixturesDir, "decorator.json")
    ],
    {
      responseStatus: 200,
      responseBody: ""
    }
  );

  assert.equal(result.request.method, "PUT");
  assert.equal(result.request.url, "http://localhost:8080/calm/namespaces/finos/decorators/9");
});

test("controls create sends wrapped requirement payload", async () => {
  const result = await runCliWithMock(
    ["controls", "create", "--domain", "security", "--file", path.join(fixturesDir, "control-requirement.json")],
    {
      responseStatus: 201,
      responseLocation: "/calm/domains/security/controls/5",
      responseBody: "{\"id\":5}"
    }
  );

  assert.equal(result.request.url, "http://localhost:8080/calm/domains/security/controls");
  const body = JSON.parse(result.request.body);
  assert.equal(body.name, "Access Control");
  assert.equal(JSON.parse(body.requirementJson).id, "ac-1");
});

test("controls list uses the domain controls route", async () => {
  const result = await runCliWithMock(["controls", "list", "--domain", "security"]);
  assert.equal(result.request.url, "http://localhost:8080/calm/domains/security/controls");
});

test("controls requirement-create-version sends raw requirement JSON", async () => {
  const result = await runCliWithMock(
    [
      "controls",
      "requirement-create-version",
      "--domain",
      "security",
      "--id",
      "5",
      "--version",
      "1.0.1",
      "--file",
      path.join(fixturesDir, "control-requirement-version.json")
    ],
    {
      responseStatus: 201,
      responseLocation: "/calm/domains/security/controls/5/requirement/versions/1.0.1",
      responseBody: ""
    }
  );

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/domains/security/controls/5/requirement/versions/1.0.1"
  );
  assert.equal(JSON.parse(result.request.body).id, "ac-1");
});

test("controls configuration-create sends wrapped configuration payload", async () => {
  const result = await runCliWithMock(
    [
      "controls",
      "configuration-create",
      "--domain",
      "security",
      "--id",
      "5",
      "--file",
      path.join(fixturesDir, "control-configuration.json")
    ],
    {
      responseStatus: 201,
      responseLocation: "/calm/domains/security/controls/5/configurations/2",
      responseBody: ""
    }
  );

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/domains/security/controls/5/configurations"
  );
  assert.equal(JSON.parse(JSON.parse(result.request.body).configurationJson).enforcement, "strict");
});

test("controls configuration-versions uses the configuration versions route", async () => {
  const result = await runCliWithMock([
    "controls",
    "configuration-versions",
    "--domain",
    "security",
    "--id",
    "5",
    "--config-id",
    "2"
  ]);

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/domains/security/controls/5/configurations/2/versions"
  );
});

test("controls configuration-create-version sends raw configuration JSON", async () => {
  const result = await runCliWithMock(
    [
      "controls",
      "configuration-create-version",
      "--domain",
      "security",
      "--id",
      "5",
      "--config-id",
      "2",
      "--version",
      "1.0.1",
      "--file",
      path.join(fixturesDir, "control-configuration-version.json")
    ],
    {
      responseStatus: 201,
      responseLocation: "/calm/domains/security/controls/5/configurations/2/versions/1.0.1",
      responseBody: ""
    }
  );

  assert.equal(
    result.request.url,
    "http://localhost:8080/calm/domains/security/controls/5/configurations/2/versions/1.0.1"
  );
  assert.equal(JSON.parse(result.request.body).enforcement, "moderate");
});
