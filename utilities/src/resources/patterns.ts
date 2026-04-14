import { buildVersionedJsonResourceCommand } from "./shared/versioned-json-resource";
import {
  extractWrappedJsonString,
  toJsonResourceCreateRequest
} from "../transformers/json-resource-payload";

export function buildPatternsCommand() {
  return buildVersionedJsonResourceCommand({
    commandName: "patterns",
    commandDescription: "Manage calm-hub patterns.",
    resourcePath: "patterns",
    payloadLabel: "Pattern",
    createPayload: (input, overrides) =>
      toJsonResourceCreateRequest(
        input,
        { payloadTypeName: "Pattern", jsonField: "patternJson" },
        overrides
      ),
    createVersionPayload: (input, overrides) =>
      extractWrappedJsonString(
        input,
        { payloadTypeName: "Pattern", jsonField: "patternJson" },
        overrides
      )
  });
}
