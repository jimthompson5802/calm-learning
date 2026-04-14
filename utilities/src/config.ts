import path from "node:path";

import { GlobalOptions } from "./types";

const DEFAULT_BASE_URL = "http://localhost:8080";
const DEFAULT_TIMEOUT_MS = 30_000;

export interface ResolvedConfig {
  baseUrl: string;
  outPath?: string;
  verbose: boolean;
  timeoutMs: number;
}

export function resolveConfig(options: GlobalOptions): ResolvedConfig {
  const timeoutMs = parseTimeout(options.timeout);

  return {
    baseUrl: normalizeBaseUrl(options.baseUrl ?? DEFAULT_BASE_URL),
    outPath: options.out ? path.resolve(options.out) : undefined,
    verbose: Boolean(options.verbose),
    timeoutMs
  };
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.replace(/\/+$/, "");
}

function parseTimeout(value?: string): number {
  if (!value) {
    return DEFAULT_TIMEOUT_MS;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid timeout value: ${value}`);
  }

  return parsed;
}
