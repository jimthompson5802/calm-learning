#!/usr/bin/env node

import { CommanderError } from "commander";

import { buildCli } from "./cli";
import { HttpError } from "./http/errors";
import { renderOutput } from "./io/write-output";

async function main(): Promise<void> {
  const cli = buildCli();
  await cli.parseAsync(process.argv);
}

main().catch((error: unknown) => {
  if (error instanceof CommanderError) {
    process.stderr.write(`${error.message}\n`);
    process.exit(error.exitCode);
  }

  if (error instanceof HttpError) {
    process.stderr.write(`HTTP ${error.status} for ${error.path}\n`);
    process.stderr.write(`${renderOutput(error.data)}\n`);
    process.exit(1);
  }

  if (error instanceof Error) {
    process.stderr.write(`${error.message}\n`);
    process.exit(1);
  }

  process.stderr.write(`${String(error)}\n`);
  process.exit(1);
});
