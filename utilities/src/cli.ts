import { Command } from "commander";

import { buildArchitecturesCommand } from "./resources/architectures";
import { buildFlowsCommand } from "./resources/flows";
import { buildInterfacesCommand } from "./resources/interfaces";
import { buildNamespacesCommand } from "./resources/namespaces";
import { buildPatternsCommand } from "./resources/patterns";
import { buildStandardsCommand } from "./resources/standards";

export function buildCli(): Command {
  const program = new Command();

  program
    .name("calm-hub")
    .description("CLI for issuing requests to a calm-hub server.")
    .option("--base-url <url>", "Base URL for calm-hub.", "http://localhost:8080")
    .option("--out <path>", "Write rendered output to a file.")
    .option("--timeout <ms>", "Request timeout in milliseconds.", "30000")
    .option("--verbose", "Print request details to stderr.", false);

  program.addCommand(buildNamespacesCommand());
  program.addCommand(buildArchitecturesCommand());
  program.addCommand(buildPatternsCommand());
  program.addCommand(buildInterfacesCommand());
  program.addCommand(buildStandardsCommand());
  program.addCommand(buildFlowsCommand());

  return program;
}
