"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveConfig = resolveConfig;
const node_path_1 = __importDefault(require("node:path"));
const DEFAULT_BASE_URL = "http://localhost:8080";
const DEFAULT_TIMEOUT_MS = 30_000;
function resolveConfig(options) {
    const timeoutMs = parseTimeout(options.timeout);
    return {
        baseUrl: normalizeBaseUrl(options.baseUrl ?? DEFAULT_BASE_URL),
        outPath: options.out ? node_path_1.default.resolve(options.out) : undefined,
        verbose: Boolean(options.verbose),
        timeoutMs
    };
}
function normalizeBaseUrl(baseUrl) {
    return baseUrl.replace(/\/+$/, "");
}
function parseTimeout(value) {
    if (!value) {
        return DEFAULT_TIMEOUT_MS;
    }
    const parsed = Number.parseInt(value, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
        throw new Error(`Invalid timeout value: ${value}`);
    }
    return parsed;
}
