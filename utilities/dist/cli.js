"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCli = buildCli;
const commander_1 = require("commander");
const architectures_1 = require("./resources/architectures");
const namespaces_1 = require("./resources/namespaces");
function buildCli() {
    const program = new commander_1.Command();
    program
        .name("calm-hub")
        .description("CLI for issuing requests to a calm-hub server.")
        .option("--base-url <url>", "Base URL for calm-hub.", "http://localhost:8080")
        .option("--out <path>", "Write rendered output to a file.")
        .option("--timeout <ms>", "Request timeout in milliseconds.", "30000")
        .option("--verbose", "Print request details to stderr.", false);
    program.addCommand((0, namespaces_1.buildNamespacesCommand)());
    program.addCommand((0, architectures_1.buildArchitecturesCommand)());
    return program;
}
