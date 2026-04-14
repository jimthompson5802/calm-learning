import { Command } from "commander";

import { buildArchitecturesCommand } from "./resources/architectures";
import { buildNamespacesCommand } from "./resources/namespaces";

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

  return program;
}
