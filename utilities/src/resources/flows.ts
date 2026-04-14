import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { writeOutput } from "../io/write-output";
import {
  extractWrappedJsonString,
  toJsonResourceCreateRequest
} from "../transformers/json-resource-payload";
import { GlobalOptions } from "../types";
import { assertIntegerId, assertNamespace } from "../validation";
import { buildVersionedJsonResourceCommand } from "./shared/versioned-json-resource";

export function buildFlowsCommand(): Command {
  const command = buildVersionedJsonResourceCommand({
    commandName: "flows",
    commandDescription: "Manage calm-hub flows.",
    resourcePath: "flows",
    payloadLabel: "Flow",
    getCommandName: "get-version",
    getCommandDescription: "Get a specific flow version.",
    createPayload: (input, overrides) =>
      toJsonResourceCreateRequest(
        input,
        { payloadTypeName: "Flow", jsonField: "flowJson" },
        overrides
      ),
    createVersionPayload: (input, overrides) =>
      extractWrappedJsonString(
        input,
        { payloadTypeName: "Flow", jsonField: "flowJson" },
        overrides
      )
  });

  command
    .command("get")
    .description("Get the latest flow version.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "Flow id.")
    .action(async (options: { namespace: string; id: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertIntegerId(options.id);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/flows/${id}`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "flows.get",
          path: `/calm/namespaces/${namespace}/flows/${id}`
        }),
        config.outPath
      );
    });

  return command;
}
