import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { readJsonObjectFile, readJsonStringBody } from "../io/read-json-file";
import { writeOutput } from "../io/write-output";
import { GlobalOptions } from "../types";
import { assertDomain, assertPositiveInteger, assertVersion } from "../validation";

export function buildControlsCommand(): Command {
  const command = new Command("controls").description("Manage calm-hub controls.");

  command
    .command("list")
    .description("List controls for a domain.")
    .requiredOption("--domain <domain>", "Domain name.")
    .action(async (options: { domain: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const domain = assertDomain(options.domain);
      const path = `/calm/domains/${encodeURIComponent(domain)}/controls`;
      const response = await requestJson({
        method: "GET",
        path,
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });
      await writeOutput(formatCommandOutput(response, { action: "controls.list", path }), config.outPath);
    });

  command
    .command("create")
    .description("Create a control requirement from a wrapped JSON file.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--file <path>", "Wrapped control requirement file.")
    .action(async (options: { domain: string; file: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const domain = assertDomain(options.domain);
      const path = `/calm/domains/${encodeURIComponent(domain)}/controls`;
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        body: await readControlRequirementPayload(options.file),
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });
      await writeOutput(formatCommandOutput(response, { action: "controls.create", path }), config.outPath);
    });

  command
    .command("requirement-versions")
    .description("List requirement versions for a control.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .action(async (options: { domain: string; id: string }, actionCommand: Command) => {
      await executeControlGet("controls.requirement-versions", buildRequirementVersionsPath(options), actionCommand);
    });

  command
    .command("requirement-get")
    .description("Get a control requirement version.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .requiredOption("--version <version>", "Requirement version.")
    .action(async (options: { domain: string; id: string; version: string }, actionCommand: Command) => {
      await executeControlGet("controls.requirement-get", buildRequirementGetPath(options), actionCommand);
    });

  command
    .command("requirement-create-version")
    .description("Create a new control requirement version from a raw JSON file.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .requiredOption("--version <version>", "Requirement version.")
    .requiredOption("--file <path>", "Raw requirement JSON file.")
    .action(async (options: { domain: string; id: string; version: string; file: string }, actionCommand: Command) => {
      await executeControlPostRaw(
        "controls.requirement-create-version",
        buildRequirementGetPath(options),
        options.file,
        actionCommand
      );
    });

  command
    .command("configurations")
    .description("List configuration ids for a control.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .action(async (options: { domain: string; id: string }, actionCommand: Command) => {
      await executeControlGet("controls.configurations", buildConfigurationsPath(options), actionCommand);
    });

  command
    .command("configuration-create")
    .description("Create a control configuration from a wrapped JSON file.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .requiredOption("--file <path>", "Wrapped control configuration file.")
    .action(async (options: { domain: string; id: string; file: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const path = buildConfigurationsPath(options);
      const response = await requestJson({
        method: "POST",
        path,
        baseUrl: config.baseUrl,
        body: await readControlConfigurationPayload(options.file),
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });
      await writeOutput(
        formatCommandOutput(response, { action: "controls.configuration-create", path }),
        config.outPath
      );
    });

  command
    .command("configuration-versions")
    .description("List configuration versions.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .requiredOption("--config-id <configId>", "Configuration id.")
    .action(async (options: { domain: string; id: string; configId: string }, actionCommand: Command) => {
      await executeControlGet("controls.configuration-versions", buildConfigurationVersionsPath(options), actionCommand);
    });

  command
    .command("configuration-get")
    .description("Get a specific configuration version.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .requiredOption("--config-id <configId>", "Configuration id.")
    .requiredOption("--version <version>", "Configuration version.")
    .action(async (options: { domain: string; id: string; configId: string; version: string }, actionCommand: Command) => {
      await executeControlGet("controls.configuration-get", buildConfigurationGetPath(options), actionCommand);
    });

  command
    .command("configuration-create-version")
    .description("Create a new control configuration version from a raw JSON file.")
    .requiredOption("--domain <domain>", "Domain name.")
    .requiredOption("--id <id>", "Control id.")
    .requiredOption("--config-id <configId>", "Configuration id.")
    .requiredOption("--version <version>", "Configuration version.")
    .requiredOption("--file <path>", "Raw configuration JSON file.")
    .action(async (options: { domain: string; id: string; configId: string; version: string; file: string }, actionCommand: Command) => {
      await executeControlPostRaw(
        "controls.configuration-create-version",
        buildConfigurationGetPath(options),
        options.file,
        actionCommand
      );
    });

  return command;
}

async function executeControlGet(action: string, path: string, actionCommand: Command): Promise<void> {
  const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
  const response = await requestJson({
    method: "GET",
    path,
    baseUrl: config.baseUrl,
    timeoutMs: config.timeoutMs,
    verbose: config.verbose
  });
  await writeOutput(formatCommandOutput(response, { action, path }), config.outPath);
}

async function executeControlPostRaw(
  action: string,
  path: string,
  file: string,
  actionCommand: Command
): Promise<void> {
  const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
  const response = await requestJson({
    method: "POST",
    path,
    baseUrl: config.baseUrl,
    body: await readJsonStringBody(file),
    timeoutMs: config.timeoutMs,
    verbose: config.verbose
  });
  await writeOutput(formatCommandOutput(response, { action, path }), config.outPath);
}

async function readControlRequirementPayload(file: string): Promise<Record<string, unknown>> {
  const payload = await readJsonObjectFile(file);
  if (
    typeof payload.name !== "string" ||
    payload.name.trim() === "" ||
    typeof payload.description !== "string" ||
    payload.description.trim() === "" ||
    typeof payload.requirementJson !== "string" ||
    payload.requirementJson.trim() === ""
  ) {
    throw new Error(
      'Control requirement file must include non-empty "name", "description", and "requirementJson" fields.'
    );
  }
  JSON.parse(payload.requirementJson);
  return payload;
}

async function readControlConfigurationPayload(file: string): Promise<Record<string, unknown>> {
  const payload = await readJsonObjectFile(file);
  if (typeof payload.configurationJson !== "string" || payload.configurationJson.trim() === "") {
    throw new Error('Control configuration file must include a non-empty "configurationJson" field.');
  }
  JSON.parse(payload.configurationJson);
  return payload;
}

function buildRequirementVersionsPath(options: { domain: string; id: string }): string {
  const domain = assertDomain(options.domain);
  const id = assertPositiveInteger(options.id, "Control id");
  return `/calm/domains/${encodeURIComponent(domain)}/controls/${id}/requirement/versions`;
}

function buildRequirementGetPath(options: { domain: string; id: string; version: string }): string {
  const domain = assertDomain(options.domain);
  const id = assertPositiveInteger(options.id, "Control id");
  const version = assertVersion(options.version);
  return `/calm/domains/${encodeURIComponent(domain)}/controls/${id}/requirement/versions/${encodeURIComponent(version)}`;
}

function buildConfigurationsPath(options: { domain: string; id: string }): string {
  const domain = assertDomain(options.domain);
  const id = assertPositiveInteger(options.id, "Control id");
  return `/calm/domains/${encodeURIComponent(domain)}/controls/${id}/configurations`;
}

function buildConfigurationVersionsPath(options: { domain: string; id: string; configId: string }): string {
  const domain = assertDomain(options.domain);
  const id = assertPositiveInteger(options.id, "Control id");
  const configId = assertPositiveInteger(options.configId, "Configuration id");
  return `/calm/domains/${encodeURIComponent(domain)}/controls/${id}/configurations/${configId}/versions`;
}

function buildConfigurationGetPath(options: {
  domain: string;
  id: string;
  configId: string;
  version: string;
}): string {
  const domain = assertDomain(options.domain);
  const id = assertPositiveInteger(options.id, "Control id");
  const configId = assertPositiveInteger(options.configId, "Configuration id");
  const version = assertVersion(options.version);
  return `/calm/domains/${encodeURIComponent(domain)}/controls/${id}/configurations/${configId}/versions/${encodeURIComponent(version)}`;
}
