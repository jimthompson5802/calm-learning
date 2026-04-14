import { ArchitectureCreateRequest } from "../types";
import { toJsonResourceCreateRequest } from "./json-resource-payload";

export function toArchitectureCreateRequest(
  input: unknown,
  overrides: { name?: string; description?: string } = {}
): ArchitectureCreateRequest {
  const payload = toJsonResourceCreateRequest(
    input,
    {
      payloadTypeName: "Architecture",
      jsonField: "architectureJson"
    },
    overrides
  );

  return {
    name: payload.name,
    description: payload.description,
    architectureJson: payload.architectureJson
  };
}
