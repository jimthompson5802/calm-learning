import { CommandOutputContext, ResponsePayload } from "../types";

export function formatCommandOutput(
  response: ResponsePayload,
  context: CommandOutputContext
): unknown {
  if (response.status === 201) {
    return {
      ok: true,
      action: context.action,
      status: response.status,
      path: context.path,
      location: response.headers.location ?? null,
      data: isStructuredStatusOnly(response.data) ? null : response.data
    };
  }

  return response.data;
}

function isStructuredStatusOnly(value: unknown): boolean {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }

  const keys = Object.keys(value);
  return keys.every((key) => key === "status" || key === "location");
}
