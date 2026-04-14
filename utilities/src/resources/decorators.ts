import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { readJsonStringBody } from "../io/read-json-file";
import { writeOutput } from "../io/write-output";
import { GlobalOptions } from "../types";
import { assertNamespace, assertPositiveInteger, assertQueryParamNoWhitespace } from "../validation";

interface DecoratorListOptions {
  namespace: string;
  target?: string;
  type?: string;
}

export function buildDecoratorsCommand(): Command {
  const command = new Command("decorators").description("Manage calm-hub decorators.");

  command
    .command("list")
    .description("List decorator ids for a namespace.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .option("--target <target>", "Optional target filter.")
    .option("--type <type>", "Optional type filter.")
    .action(async (options: DecoratorListOptions, actionCommand: Command) => {
      await executeDecoratorQuery("decorators.list", "/decorators", options, actionCommand);
    });

  command
    .command("values")
    .description("List decorator values for a namespace.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .option("--target <target>", "Optional target filter.")
    .option("--type <type>", "Optional type filter.")
    .action(async (options: DecoratorListOptions, actionCommand: Command) => {
      await executeDecoratorQuery("decorators.values", "/decorators/values", options, actionCommand);
    });

  command
    .command("get")
    .description("Get a decorator by id.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "Decorator id.")
    .action(async (options: { namespace: string; id: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const namespace = assertNamespace(options.namespace);
      const id = assertPositiveInteger(options.id, "Decorator id");
      const path = `/calm/namespaces/${encodeURIComponent(namespace)}/decorators/${id}`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });
      await writeOutput(formatCommandOutput(response, { action: "decorators.get", path }), config.outPath);
    });

  command
    .command("create")
    .description("Create a decorator from a JSON file.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--file <path>", "Decorator JSON file.")
    .action(async (options: { namespace: string; file: string }, actionCommand: Command) => {
      await executeDecoratorMutation("decorators.create", "POST", undefined, options, actionCommand);
    });

  command
    .command("update")
    .description("Update a decorator from a JSON file.")
    .requiredOption("--namespace <namespace>", "Namespace name.")
    .requiredOption("--id <id>", "Decorator id.")
    .requiredOption("--file <path>", "Decorator JSON file.")
    .action(async (options: { namespace: string; id: string; file: string }, actionCommand: Command) => {
      await executeDecoratorMutation("decorators.update", "PUT", options.id, options, actionCommand);
    });

  return command;
}

async function executeDecoratorQuery(
  action: string,
  suffix: string,
  options: DecoratorListOptions,
  actionCommand: Command
): Promise<void> {
  const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
  const namespace = assertNamespace(options.namespace);
  const query = buildDecoratorQuery(options);
  const path = `/calm/namespaces/${encodeURIComponent(namespace)}${suffix}${query}`;
  const response = await requestJson({
    method: "GET",
    path,
    baseUrl: config.baseUrl,
    timeoutMs: config.timeoutMs,
    verbose: config.verbose
  });
  await writeOutput(formatCommandOutput(response, { action, path }), config.outPath);
}

async function executeDecoratorMutation(
  action: string,
  method: "POST" | "PUT",
  id: string | undefined,
  options: { namespace: string; file: string },
  actionCommand: Command
): Promise<void> {
  const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
  const namespace = assertNamespace(options.namespace);
  const decoratorId = id ? assertPositiveInteger(id, "Decorator id") : undefined;
  const body = await readJsonStringBody(options.file);
  const path = decoratorId
    ? `/calm/namespaces/${encodeURIComponent(namespace)}/decorators/${decoratorId}`
    : `/calm/namespaces/${encodeURIComponent(namespace)}/decorators`;
  const response = await requestJson({
    method,
    path,
    baseUrl: config.baseUrl,
    body,
    timeoutMs: config.timeoutMs,
    verbose: config.verbose
  });
  await writeOutput(formatCommandOutput(response, { action, path }), config.outPath);
}

function buildDecoratorQuery(options: DecoratorListOptions): string {
  const params = new URLSearchParams();

  if (options.target) {
    params.set("target", assertQueryParamNoWhitespace(options.target, "Decorator target"));
  }

  if (options.type) {
    params.set("type", assertQueryParamNoWhitespace(options.type, "Decorator type"));
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
