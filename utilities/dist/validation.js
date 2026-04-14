"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertNamespace = assertNamespace;
exports.assertVersion = assertVersion;
exports.assertIntegerId = assertIntegerId;
const NAMESPACE_REGEX = /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/;
const VERSION_REGEX = /^(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)$/;
function assertNamespace(value) {
    if (!NAMESPACE_REGEX.test(value)) {
        throw new Error(`Namespace must match pattern '^[A-Za-z0-9-]+([.][A-Za-z0-9-]+)*$'. Received: ${value}`);
    }
    return value;
}
function assertVersion(value) {
    if (!VERSION_REGEX.test(value)) {
        throw new Error(`Version must match pattern '^(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)$'. Received: ${value}`);
    }
    return value;
}
function assertIntegerId(value) {
    if (!/^\d+$/.test(value)) {
        throw new Error(`Architecture id must be a non-negative integer. Received: ${value}`);
    }
    return value;
}
