import { buildVersionedJsonResourceCommand } from "./shared/versioned-json-resource";
import { toJsonResourceCreateRequest } from "../transformers/json-resource-payload";

export function buildStandardsCommand() {
  const createPayload = (input: unknown, overrides?: { name?: string; description?: string }) =>
    toJsonResourceCreateRequest(
      input,
      { payloadTypeName: "Standard", jsonField: "standardJson" },
      overrides
    );

  return buildVersionedJsonResourceCommand({
    commandName: "standards",
    commandDescription: "Manage calm-hub standards.",
    resourcePath: "standards",
    payloadLabel: "Standard",
    createPayload,
    createVersionPayload: createPayload
  });
}
