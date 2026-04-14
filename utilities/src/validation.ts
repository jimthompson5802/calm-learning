const NAMESPACE_REGEX = /^[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*$/;
const VERSION_REGEX = /^(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)[-.]?(0|[1-9][0-9]*)$/;

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
