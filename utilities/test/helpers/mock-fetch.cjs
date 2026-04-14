const fs = require("node:fs");

const requestsFile = process.env.MOCK_FETCH_REQUESTS_FILE;
const responseBody = process.env.MOCK_FETCH_RESPONSE_BODY ?? '{"ok":true}';
const responseStatus = Number.parseInt(process.env.MOCK_FETCH_STATUS ?? "200", 10);
const responseContentType = process.env.MOCK_FETCH_CONTENT_TYPE ?? "application/json";
const responseLocation = process.env.MOCK_FETCH_LOCATION;

if (!requestsFile) {
  throw new Error("MOCK_FETCH_REQUESTS_FILE is required.");
}

globalThis.fetch = async (url, init = {}) => {
  const request = {
    url,
    method: init.method ?? "GET",
    headers: init.headers ?? {},
    body: init.body ?? null
  };

  fs.writeFileSync(requestsFile, JSON.stringify(request, null, 2), "utf8");

  const headers = new Headers({
    "content-type": responseContentType
  });

  if (responseLocation) {
    headers.set("location", responseLocation);
  }

  return new Response(responseBody, {
    status: responseStatus,
    headers
  });
};
