import { Command } from "commander";

import { resolveConfig } from "../../config";
import { requestJson } from "../../http/client";
import { formatCommandOutput } from "../../io/format-response";
import { readJsonFile } from "../../io/read-json-file";
import { writeOutput } from "../../io/write-output";
import { GlobalOptions } from "../../types";
import { assertIntegerId, assertNamespace, assertVersion } from "../../validation";

interface FilePayloadOptions {
  namespace: string;
  file: string;
  name?: string;
  description?: string;
}

interface LookupOptions {
  namespace: string;
  id: string;
  version?: string;
}

interface VersionedJsonResourceDefinition {
  commandName: string;
  commandDescription: string;
  resourcePath: string;
  payloadLabel: string;
  createPayload(input: unknown, overrides?: { name?: string; description?: string }): unknown;
  createVersionPayload(input: unknown, overrides?: { name?: string; description?: string }): unknown;
  getCommandName?: string;
  getCommandDescription?: string;
}

export function buildVersionedJsonResourceCommand(
  definition: VersionedJsonResourceDefinition
): Command {
  const command = new Command(definition.commandName).description(definition.commandDescription);
  const getCommandName = definition.getCommandName ?? "get";
  const getCommandDescription =
    definition.getCommandDescription ?? `Get a specific ${definition.payloadLabel.toLowerCase()} version.`;

  command
    .command("list")
    .description(`List ${definition.payloadLabel.toLowerCase()} summaries for a namespace.`)
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .action(async (options: { namespace: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/${definition.resourcePath}`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: `${definition.commandName}.list`,
          path: `/calm/namespaces/${namespace}/${definition.resourcePath}`
        }),
        config.outPath
      );
    });

  command
    .command("create")
    .description(`Create a new ${definition.payloadLabel.toLowerCase()} in a namespace from a JSON file.`)
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--file <path>", `Path to a ${definition.payloadLabel.toLowerCase()} JSON file.`)
    .option("--name <name>", `Override the ${definition.payloadLabel.toLowerCase()} name.`)
    .option("--description <description>", `Override the ${definition.payloadLabel.toLowerCase()} description.`)
    .action(async (options: FilePayloadOptions, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const input = await readJsonFile(options.file);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/${definition.resourcePath}`;
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        body: definition.createPayload(input, options),
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: `${definition.commandName}.create`,
          path: `/calm/namespaces/${namespace}/${definition.resourcePath}`
        }),
        config.outPath
      );
    });

  command
    .command("versions")
    .description(`List versions for a ${definition.payloadLabel.toLowerCase()}.`)
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", `${definition.payloadLabel} id.`)
    .action(async (options: LookupOptions, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertIntegerId(options.id);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/${definition.resourcePath}/${id}/versions`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: `${definition.commandName}.versions`,
          path: `/calm/namespaces/${namespace}/${definition.resourcePath}/${id}/versions`
        }),
        config.outPath
      );
    });

  command
    .command(getCommandName)
    .description(getCommandDescription)
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", `${definition.payloadLabel} id.`)
    .requiredOption("--version <version>", `${definition.payloadLabel} version.`)
    .action(async (options: Required<LookupOptions>, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertIntegerId(options.id);
      const version = assertVersion(options.version);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/${definition.resourcePath}/${id}/versions/${encodeURIComponent(version)}`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: `${definition.commandName}.${getCommandName}`,
          path: `/calm/namespaces/${namespace}/${definition.resourcePath}/${id}/versions/${version}`
        }),
        config.outPath
      );
    });

  command
    .command("create-version")
    .description(`Create a new version for an existing ${definition.payloadLabel.toLowerCase()}.`)
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", `${definition.payloadLabel} id.`)
    .requiredOption("--version <version>", "Version to create.")
    .requiredOption("--file <path>", `Path to a ${definition.payloadLabel.toLowerCase()} JSON file.`)
    .option("--name <name>", `Override the ${definition.payloadLabel.toLowerCase()} name.`)
    .option("--description <description>", `Override the ${definition.payloadLabel.toLowerCase()} description.`)
    .action(async (options: FilePayloadOptions & Required<Pick<LookupOptions, "id" | "version">>, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertIntegerId(options.id);
      const version = assertVersion(options.version);
      const input = await readJsonFile(options.file);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/${definition.resourcePath}/${id}/versions/${encodeURIComponent(version)}`;
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        body: definition.createVersionPayload(input, options),
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: `${definition.commandName}.create-version`,
          path: `/calm/namespaces/${namespace}/${definition.resourcePath}/${id}/versions/${version}`
        }),
        config.outPath
      );
    });

  return command;
}
