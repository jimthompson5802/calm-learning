import { HttpError } from "./errors";
import { RequestOptions, ResponsePayload } from "../types";

export async function requestJson(options: RequestOptions): Promise<ResponsePayload> {
  const url = `${options.baseUrl}${options.path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 30_000);

  const init: RequestInit = {
    method: options.method,
    headers: {
      Accept: "application/json"
    },
    signal: controller.signal
  };

  if (options.body !== undefined) {
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json"
    };
    init.body = typeof options.body === "string" ? options.body : JSON.stringify(options.body);
  }

  if (options.verbose) {
    process.stderr.write(`[calm-hub] ${options.method} ${url}\n`);
  }

  try {
    const response = await fetch(url, init);
    const payload = await buildPayload(response);

    if (!response.ok) {
      throw new HttpError(
        `Request failed with status ${response.status}`,
        response.status,
        options.path,
        payload.data
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timed out after ${options.timeoutMs ?? 30_000}ms`);
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function buildPayload(response: Response): Promise<ResponsePayload> {
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const contentType = response.headers.get("content-type") ?? "";
  const rawText = await response.text();

  if (!rawText) {
    return {
      status: response.status,
      headers,
      data: buildEmptyResponseData(response)
    };
  }

  if (contentType.includes("application/json")) {
    try {
      return {
        status: response.status,
        headers,
        data: JSON.parse(rawText)
      };
    } catch {
      return {
        status: response.status,
        headers,
        data: rawText
      };
    }
  }

  return {
    status: response.status,
    headers,
    data: rawText
  };
}

function buildEmptyResponseData(response: Response): unknown {
  const location = response.headers.get("location");
  if (location) {
    return {
      status: response.status,
      location
    };
  }

  return {
    status: response.status
  };
}
