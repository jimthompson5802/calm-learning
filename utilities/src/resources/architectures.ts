import { buildVersionedJsonResourceCommand } from "./shared/versioned-json-resource";
import { toArchitectureCreateRequest } from "../transformers/architecture-payload";

export function buildArchitecturesCommand() {
  return buildVersionedJsonResourceCommand({
    commandName: "architectures",
    commandDescription: "Manage calm-hub architectures.",
    resourcePath: "architectures",
    payloadLabel: "Architecture",
    createPayload: toArchitectureCreateRequest,
    createVersionPayload: toArchitectureCreateRequest
  });
}
