import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { readJsonObjectFile } from "../io/read-json-file";
import { writeOutput } from "../io/write-output";
import { GlobalOptions } from "../types";
import { assertAdrStatus, assertNamespace, assertPositiveInteger } from "../validation";

export function buildAdrsCommand(): Command {
  const command = new Command("adrs").description("Manage calm-hub ADRs.");

  command
    .command("list")
    .description("List ADRs for a namespace.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .action(async (options: { namespace: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(formatCommandOutput(response, { action: "adrs.list", path }), config.outPath);
    });

  command
    .command("create")
    .description("Create an ADR from a JSON file.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--file <path>", "ADR request file.")
    .action(async (options: { namespace: string; file: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const payload = await readJsonObjectFile(options.file);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs`;
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        body: payload,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(formatCommandOutput(response, { action: "adrs.create", path }), config.outPath);
    });

  command
    .command("get")
    .description("Get the latest ADR revision.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "ADR id.")
    .action(async (options: { namespace: string; id: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertPositiveInteger(options.id, "ADR id");
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs/${id}`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(formatCommandOutput(response, { action: "adrs.get", path }), config.outPath);
    });

  command
    .command("revisions")
    .description("List ADR revisions.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "ADR id.")
    .action(async (options: { namespace: string; id: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertPositiveInteger(options.id, "ADR id");
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs/${id}/revisions`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(formatCommandOutput(response, { action: "adrs.revisions", path }), config.outPath);
    });

  command
    .command("get-revision")
    .description("Get a specific ADR revision.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "ADR id.")
    .requiredOption("--revision <revision>", "ADR revision.")
    .action(async (options: { namespace: string; id: string; revision: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertPositiveInteger(options.id, "ADR id");
      const revision = assertPositiveInteger(options.revision, "ADR revision");
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs/${id}/revisions/${revision}`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, { action: "adrs.get-revision", path }),
        config.outPath
      );
    });

  command
    .command("update")
    .description("Create a new ADR revision from a JSON file.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "ADR id.")
    .requiredOption("--file <path>", "ADR request file.")
    .action(async (options: { namespace: string; id: string; file: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertPositiveInteger(options.id, "ADR id");
      const payload = await readJsonObjectFile(options.file);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs/${id}`;
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        body: payload,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(formatCommandOutput(response, { action: "adrs.update", path }), config.outPath);
    });

  command
    .command("status")
    .description("Create a new ADR revision with an updated status.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "ADR id.")
    .requiredOption("--status <status>", "ADR status.")
    .action(async (options: { namespace: string; id: string; status: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertPositiveInteger(options.id, "ADR id");
      const status = assertAdrStatus(options.status);
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/adrs/${id}/status/${encodeURIComponent(status)}`;
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(formatCommandOutput(response, { action: "adrs.status", path }), config.outPath);
    });

  return command;
}
