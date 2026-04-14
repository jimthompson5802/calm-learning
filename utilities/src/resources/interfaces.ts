import { buildVersionedJsonResourceCommand } from "./shared/versioned-json-resource";
import { toJsonResourceCreateRequest } from "../transformers/json-resource-payload";

export function buildInterfacesCommand() {
  const createPayload = (input: unknown, overrides?: { name?: string; description?: string }) =>
    toJsonResourceCreateRequest(
      input,
      { payloadTypeName: "Interface", jsonField: "interfaceJson" },
      overrides
    );

  return buildVersionedJsonResourceCommand({
    commandName: "interfaces",
    commandDescription: "Manage calm-hub interfaces.",
    resourcePath: "interfaces",
    payloadLabel: "Interface",
    createPayload,
    createVersionPayload: createPayload
  });
}
