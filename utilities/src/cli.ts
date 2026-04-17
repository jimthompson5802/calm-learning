import { Command } from "commander";

import { buildArchitecturesCommand } from "./resources/architectures";
import { buildAdrsCommand } from "./resources/adrs";
import { buildControlsCommand } from "./resources/controls";
import { buildDecoratorsCommand } from "./resources/decorators";
import { buildDomainsCommand } from "./resources/domains";
import { buildFlowsCommand } from "./resources/flows";
import { buildInterfacesCommand } from "./resources/interfaces";
import { buildNamespacesCommand } from "./resources/namespaces";
import { buildPatternsCommand } from "./resources/patterns";
import { buildStandardsCommand } from "./resources/standards";

export function buildCli(): Command {
  const program = new Command();

  program
    .name("calm-hub-cli")
    .description("CLI for issuing requests to a calm-hub server.")
    .option("--base-url <url>", "Base URL for calm-hub.", "http://localhost:8080")
    .option("--out <path>", "Write rendered output to a file.")
    .option("--timeout <ms>", "Request timeout in milliseconds.", "30000")
    .option("--verbose", "Print request details to stderr.", false);

  program.addCommand(buildNamespacesCommand());
  program.addCommand(buildDomainsCommand());
  program.addCommand(buildArchitecturesCommand());
  program.addCommand(buildAdrsCommand());
  program.addCommand(buildDecoratorsCommand());
  program.addCommand(buildControlsCommand());
  program.addCommand(buildPatternsCommand());
  program.addCommand(buildInterfacesCommand());
  program.addCommand(buildStandardsCommand());
  program.addCommand(buildFlowsCommand());

  return program;
}
