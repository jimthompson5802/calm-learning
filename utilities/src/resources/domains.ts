import { Command } from "commander";

import { resolveConfig } from "../config";
import { requestJson } from "../http/client";
import { formatCommandOutput } from "../io/format-response";
import { writeOutput } from "../io/write-output";
import { GlobalOptions } from "../types";
import { assertDomain } from "../validation";

export function buildDomainsCommand(): Command {
  const command = new Command("domains").description("Manage calm-hub domains.");

  command
    .command("list")
    .description("List domains.")
    .action(async (_, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const response = await requestJson({
        method: "GET",
        path: "/calm/domains",
        baseUrl: config.baseUrl,
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "domains.list",
          path: "/calm/domains"
        }),
        config.outPath
      );
    });

  command
    .command("create")
    .description("Create a domain.")
    .requiredOption("--name <name>", "Domain name.")
    .action(async (options: { name: string }, actionCommand: Command) => {
      const config = resolveConfig(actionCommand.optsWithGlobals<GlobalOptions>());
      const name = assertDomain(options.name);
      const response = await requestJson({
        method: "POST",
        path: "/calm/domains",
        baseUrl: config.baseUrl,
        body: { name },
        timeoutMs: config.timeoutMs,
        verbose: config.verbose
      });

      await writeOutput(
        formatCommandOutput(response, {
          action: "domains.create",
          path: "/calm/domains"
        }),
        config.outPath
      );
    });

  return command;
}
