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
    .description("Create a namespace from flags or a JSON file.")
    .option("--file <path>", "Path to a namespace JSON file.")
    .option("--name <name>", "Namespace name.")
    .option("--description <description>", "Namespace description.")
    .action(async (options: { file?: string; name?: string; description?: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const payload = await resolveNamespacePayload(options);
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

async function resolveNamespacePayload(options: {
  file?: string;
  name?: string;
  description?: string;
}): Promise<NamespaceCreateRequest> {
  const filePath = options.file;
  const hasFile = typeof filePath === "string";
  const hasName = typeof options.name === "string";
  const hasDescription = typeof options.description === "string";

  if (hasFile && (hasName || hasDescription)) {
    throw new Error('Use either "--file" or "--name" with "--description", but not both.');
  }

  if (hasFile) {
    if (filePath === undefined) {
      throw new Error("Namespace file path was not provided.");
    }
    const payload = await readJsonFile(filePath);
    assertNamespacePayload(payload, filePath);
    return payload;
  }

  if (hasName !== hasDescription) {
    throw new Error('Namespace creation with flags requires both "--name" and "--description".');
  }

  if (hasName && hasDescription) {
    const payload = {
      name: options.name,
      description: options.description
    };
    assertNamespacePayload(payload, "command line options");
    return payload;
  }

  throw new Error('Provide either "--file <path>" or both "--name <name>" and "--description <description>".');
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
