import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { readJsonFile } from "../io/read-json-file";
import { writeOutput } from "../io/write-output";
import { GlobalOptions, NamespaceCreateRequest } from "../types";
import { assertNamespace } from "../validation";

export function buildNamespacesCommand(): Command {
  const command = new Command("namespaces").description("Manage calm-hub namespaces.");

  command
    .command("list")
    .description("List namespaces.")
    .action(async (_, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const response = await requestJson({
        method: "GET",
        path: "/calm/namespaces",
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "namespaces.list",
          path: "/calm/namespaces"
        }),
        config.outPath
      );
    });

  command
    .command("create")
    .description("Create a namespace from a JSON file.")
    .requiredOption("--file <path>", "Path to a namespace JSON file.")
    .action(async (options: { file: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const payload = await readJsonFile(options.file);
      assertNamespacePayload(payload, options.file);
      assertNamespace(payload.name);

      const response = await requestJson({
        method: "POST",
        path: "/calm/namespaces",
        baseUrl: config.baseUrl,
        body: payload,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "namespaces.create",
          path: "/calm/namespaces"
        }),
        config.outPath
      );
    });

  return command;
}

function assertNamespacePayload(payload: unknown, source: string): asserts payload is NamespaceCreateRequest {
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    throw new Error(`Namespace file ${source} must contain a JSON object.`);
  }

  const record = payload as Record<string, unknown>;
  if (typeof record.name !== "string" || record.name.trim() === "") {
    throw new Error(`Namespace file ${source} must include a non-empty string "name".`);
  }

  if (typeof record.description !== "string" || record.description.trim() === "") {
    throw new Error(`Namespace file ${source} must include a non-empty string "description".`);
  }
}
