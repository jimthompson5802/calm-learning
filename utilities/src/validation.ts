const NAMESPACE_REGEX = /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/;
const DOMAIN_REGEX = /^[A-Za-z0-9-]+$/;
const VERSION_REGEX = /^(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)$/;
const NO_WHITESPACE_QUERY_REGEX = /^[A-Za-z0-9_/.-]+$/;
const ADR_STATUSES = new Set([
  "draft",
  "proposed",
  "accepted",
  "superseded",
  "rejected",
  "deprecated"
]);

export function assertNamespace(value: string): string {
  if (!NAMESPACE_REGEX.test(value)) {
    throw new Error(
      `Namespace must match pattern '^[A-Za-z0-9-]+([.][A-Za-z0-9-]+)*$'. Received: ${value}`
    );
  }

  return value;
}

export function assertVersion(value: string): string {
  if (!VERSION_REGEX.test(value)) {
    throw new Error(
      `Version must match pattern '^(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)$'. Received: ${value}`
    );
  }

  return value;
}

export function assertIntegerId(value: string): string {
  if (!/^\d+$/.test(value)) {
    throw new Error(`Architecture id must be a non-negative integer. Received: ${value}`);
  }

  return value;
}

export function assertPositiveInteger(value: string, label: string): string {
  if (!/^[1-9]\d*$/.test(value)) {
    throw new Error(`${label} must be a positive integer. Received: ${value}`);
  }

  return value;
}

export function assertDomain(value: string): string {
  if (!DOMAIN_REGEX.test(value)) {
    throw new Error(`Domain must match pattern '^[A-Za-z0-9-]+$'. Received: ${value}`);
  }

  return value;
}

export function assertQueryParamNoWhitespace(value: string, label: string): string {
  if (!NO_WHITESPACE_QUERY_REGEX.test(value)) {
    throw new Error(`${label} must match pattern '^[A-Za-z0-9_/.-]+$'. Received: ${value}`);
  }

  return value;
}

export function assertAdrStatus(value: string): string {
  if (!ADR_STATUSES.has(value)) {
    throw new Error(
      `ADR status must be one of: ${Array.from(ADR_STATUSES).join(", ")}. Received: ${value}`
    );
  }

  return value;
}
