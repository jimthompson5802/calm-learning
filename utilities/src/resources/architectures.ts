import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { readJsonFile } from "../io/read-json-file";
import { writeOutput } from "../io/write-output";
import { toArchitectureCreateRequest } from "../transformers/architecture-payload";
import { GlobalOptions } from "../types";
import { assertIntegerId, assertNamespace, assertVersion } from "../validation";

interface ArchitectureFileOptions {
  namespace: string;
  file: string;
  name?: string;
  description?: string;
}

interface ArchitectureLookupOptions {
  namespace: string;
  id: string;
  version?: string;
}

export function buildArchitecturesCommand(): Command {
  const command = new Command("architectures").description("Manage calm-hub architectures.");

  command
    .command("list")
    .description("List architecture summaries for a namespace.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .action(async (options: { namespace: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const response = await requestJson({
        method: "GET",
        path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures`,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "architectures.list",
          path: `/calm/namespaces/${namespace}/architectures`
        }),
        config.outPath
      );
    });

  command
    .command("create")
    .description("Create a new architecture in a namespace from a JSON file.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--file <path>", "Path to an architecture JSON file.")
    .option("--name <name>", "Override the architecture name.")
    .option("--description <description>", "Override the architecture description.")
    .action(async (options: ArchitectureFileOptions, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const input = await readJsonFile(options.file);
      const payload = toArchitectureCreateRequest(input, {
        name: options.name,
        description: options.description
      });

      const response = await requestJson({
        method: "POST",
        path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures`,
        baseUrl: config.baseUrl,
        body: payload,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "architectures.create",
          path: `/calm/namespaces/${namespace}/architectures`
        }),
        config.outPath
      );
    });

  command
    .command("versions")
    .description("List versions for an architecture.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "Architecture id.")
    .action(async (options: ArchitectureLookupOptions, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const architectureId = assertIntegerId(options.id);
      const response = await requestJson({
        method: "GET",
        path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures/${architectureId}/versions`,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "architectures.versions",
          path: `/calm/namespaces/${namespace}/architectures/${architectureId}/versions`
        }),
        config.outPath
      );
    });

  command
    .command("get")
    .description("Get a specific architecture version.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "Architecture id.")
    .requiredOption("--version <version>", "Architecture version.")
    .action(async (options: Required<ArchitectureLookupOptions>, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const architectureId = assertIntegerId(options.id);
      const version = assertVersion(options.version);
      const response = await requestJson({
        method: "GET",
        path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures/${architectureId}/versions/${encodeURIComponent(version)}`,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "architectures.get",
          path: `/calm/namespaces/${namespace}/architectures/${architectureId}/versions/${version}`
        }),
        config.outPath
      );
    });

  command
    .command("create-version")
    .description("Create a new version for an existing architecture.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "Architecture id.")
    .requiredOption("--version <version>", "Version to create.")
    .requiredOption("--file <path>", "Path to an architecture JSON file.")
    .option("--name <name>", "Override the architecture name.")
    .option("--description <description>", "Override the architecture description.")
    .action(
      async (
        options: ArchitectureFileOptions & Required<Pick<ArchitectureLookupOptions, "id" | "version">>,
        actionCommand: Command
      ) => {
        const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
        const namespace = assertNamespace(options.namespace);
        const architectureId = assertIntegerId(options.id);
        const version = assertVersion(options.version);
        const input = await readJsonFile(options.file);
        const payload = toArchitectureCreateRequest(input, {
          name: options.name,
          description: options.description
        });

        const response = await requestJson({
          method: "POST",
          path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures/${architectureId}/versions/${encodeURIComponent(version)}`,
          baseUrl: config.baseUrl,
          body: payload,
          timeoutMs: config.timeoutMs,
          verbose: config.verbose
        });

        await writeOutput(
          formatCommandOutput(response, {
            action: "architectures.create-version",
            path: `/calm/namespaces/${namespace}/architectures/${architectureId}/versions/${version}`
          }),
          config.outPath
        );
      }
    );

  return command;
}
