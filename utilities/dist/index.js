#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const cli_1 = require("./cli");
const errors_1 = require("./http/errors");
const write_output_1 = require("./io/write-output");
async function main() {
    const cli = (0, cli_1.buildCli)();
    await cli.parseAsync(process.argv);
}
main().catch((error) => {
    if (error instanceof commander_1.CommanderError) {
        process.stderr.write(`${error.message}\n`);
        process.exit(error.exitCode);
    }
    if (error instanceof errors_1.HttpError) {
        process.stderr.write(`HTTP ${error.status} for ${error.path}\n`);
        process.stderr.write(`${(0, write_output_1.renderOutput)(error.data)}\n`);
        process.exit(1);
    }
    if (error instanceof Error) {
        process.stderr.write(`${error.message}\n`);
        process.exit(1);
    }
    process.stderr.write(`${String(error)}\n`);
    process.exit(1);
});
