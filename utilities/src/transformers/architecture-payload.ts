import { ArchitectureCreateRequest } from "../types";

interface ArchitecturePayloadOverrides {
  name?: string;
  description?: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function toArchitectureCreateRequest(
  input: unknown,
  overrides: ArchitecturePayloadOverrides = {}
): ArchitectureCreateRequest {
  if (!isRecord(input)) {
    throw new Error("Architecture file must contain a JSON object.");
  }

  if (typeof input.architectureJson === "string") {
    assertValidJsonString(input.architectureJson);
    const name = normalizeText(overrides.name ?? input.name);
    const description = normalizeText(overrides.description ?? input.description);

    if (!name || !description) {
      throw new Error("Wrapped architecture payloads must include name and description.");
    }

    return {
      name,
      description,
      architectureJson: input.architectureJson
    };
  }

  const name = normalizeText(overrides.name ?? input.name);
  const description = normalizeText(overrides.description ?? input.description);

  if (!name || !description) {
    throw new Error(
      "Plain CALM JSON files must include top-level name and description, or you must provide overrides."
    );
  }

  return {
    name,
    description,
    architectureJson: JSON.stringify(input)
  };
}

function assertValidJsonString(value: string): void {
  try {
    JSON.parse(value);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Wrapped architecture payload contains invalid JSON in "architectureJson": ${detail}`);
  }
}

function normalizeText(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}
