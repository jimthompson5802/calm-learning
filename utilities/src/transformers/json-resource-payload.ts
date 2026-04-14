interface JsonResourcePayloadOverrides {
  name?: string;
  description?: string;
}

interface JsonResourcePayloadOptions {
  payloadTypeName: string;
  jsonField: string;
}

export interface JsonResourceCreateRequest {
  name: string;
  description: string;
  [key: string]: string;
}

export function toJsonResourceCreateRequest(
  input: unknown,
  options: JsonResourcePayloadOptions,
  overrides: JsonResourcePayloadOverrides = {}
): JsonResourceCreateRequest {
  if (!isRecord(input)) {
    throw new Error(`${options.payloadTypeName} file must contain a JSON object.`);
  }

  const wrappedJson = input[options.jsonField];
  if (typeof wrappedJson === "string") {
    assertValidJsonString(wrappedJson, options);
    const name = normalizeText(overrides.name ?? input.name);
    const description = normalizeText(overrides.description ?? input.description);

    if (!name || !description) {
      throw new Error(`Wrapped ${options.payloadTypeName.toLowerCase()} payloads must include name and description.`);
    }

    return {
      name,
      description,
      [options.jsonField]: wrappedJson
    };
  }

  const name = normalizeText(overrides.name ?? input.name);
  const description = normalizeText(overrides.description ?? input.description);

  if (!name || !description) {
    throw new Error(
      `Plain CALM JSON files must include top-level name and description, or you must provide overrides.`
    );
  }

  return {
    name,
    description,
    [options.jsonField]: JSON.stringify(input)
  };
}

export function extractWrappedJsonString(
  input: unknown,
  options: JsonResourcePayloadOptions,
  overrides: JsonResourcePayloadOverrides = {}
): string {
  return toJsonResourceCreateRequest(input, options, overrides)[options.jsonField];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertValidJsonString(value: string, options: JsonResourcePayloadOptions): void {
  try {
    JSON.parse(value);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Wrapped ${options.payloadTypeName.toLowerCase()} payload contains invalid JSON in "${options.jsonField}": ${detail}`
    );
  }
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
