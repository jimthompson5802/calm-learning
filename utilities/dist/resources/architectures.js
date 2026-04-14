"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildArchitecturesCommand = buildArchitecturesCommand;
const commander_1 = require("commander");
const config_1 = require("../config");
const client_1 = require("../http/client");
const format_response_1 = require("../io/format-response");
const read_json_file_1 = require("../io/read-json-file");
const write_output_1 = require("../io/write-output");
const architecture_payload_1 = require("../transformers/architecture-payload");
const validation_1 = require("../validation");
function buildArchitecturesCommand() {
    const command = new commander_1.Command("architectures").description("Manage calm-hub architectures.");
    command
        .command("list")
        .description("List architecture summaries for a namespace.")
        .requiredOption("--namespace <namespace>", "Namespace name.")
        .action(async (options, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const namespace = (0, validation_1.assertNamespace)(options.namespace);
        const response = await (0, client_1.requestJson)({
            method: "GET",
            path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures`,
            baseUrl: config.baseUrl,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "architectures.list",
            path: `/calm/namespaces/${namespace}/architectures`
        }), config.outPath);
    });
    command
        .command("create")
        .description("Create a new architecture in a namespace from a JSON file.")
        .requiredOption("--namespace <namespace>", "Namespace name.")
        .requiredOption("--file <path>", "Path to an architecture JSON file.")
        .option("--name <name>", "Override the architecture name.")
        .option("--description <description>", "Override the architecture description.")
        .action(async (options, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const namespace = (0, validation_1.assertNamespace)(options.namespace);
        const input = await (0, read_json_file_1.readJsonFile)(options.file);
        const payload = (0, architecture_payload_1.toArchitectureCreateRequest)(input, {
            name: options.name,
            description: options.description
        });
        const response = await (0, client_1.requestJson)({
            method: "POST",
            path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures`,
            baseUrl: config.baseUrl,
            body: payload,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "architectures.create",
            path: `/calm/namespaces/${namespace}/architectures`
        }), config.outPath);
    });
    command
        .command("versions")
        .description("List versions for an architecture.")
        .requiredOption("--namespace <namespace>", "Namespace name.")
        .requiredOption("--id <id>", "Architecture id.")
        .action(async (options, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const namespace = (0, validation_1.assertNamespace)(options.namespace);
        const architectureId = (0, validation_1.assertIntegerId)(options.id);
        const response = await (0, client_1.requestJson)({
            method: "GET",
            path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures/${architectureId}/versions`,
            baseUrl: config.baseUrl,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "architectures.versions",
            path: `/calm/namespaces/${namespace}/architectures/${architectureId}/versions`
        }), config.outPath);
    });
    command
        .command("get")
        .description("Get a specific architecture version.")
        .requiredOption("--namespace <namespace>", "Namespace name.")
        .requiredOption("--id <id>", "Architecture id.")
        .requiredOption("--version <version>", "Architecture version.")
        .action(async (options, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const namespace = (0, validation_1.assertNamespace)(options.namespace);
        const architectureId = (0, validation_1.assertIntegerId)(options.id);
        const version = (0, validation_1.assertVersion)(options.version);
        const response = await (0, client_1.requestJson)({
            method: "GET",
            path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures/${architectureId}/versions/${encodeURIComponent(version)}`,
            baseUrl: config.baseUrl,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "architectures.get",
            path: `/calm/namespaces/${namespace}/architectures/${architectureId}/versions/${version}`
        }), config.outPath);
    });
    command
        .command("create-version")
        .description("Create a new version for an existing architecture.")
        .requiredOption("--namespace <namespace>", "Namespace name.")
        .requiredOption("--id <id>", "Architecture id.")
        .requiredOption("--version <version>", "Version to create.")
        .requiredOption("--file <path>", "Path to an architecture JSON file.")
        .option("--name <name>", "Override the architecture name.")
        .option("--description <description>", "Override the architecture description.")
        .action(async (options, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const namespace = (0, validation_1.assertNamespace)(options.namespace);
        const architectureId = (0, validation_1.assertIntegerId)(options.id);
        const version = (0, validation_1.assertVersion)(options.version);
        const input = await (0, read_json_file_1.readJsonFile)(options.file);
        const payload = (0, architecture_payload_1.toArchitectureCreateRequest)(input, {
            name: options.name,
            description: options.description
        });
        const response = await (0, client_1.requestJson)({
            method: "POST",
            path: `/calm/namespaces/${encodeURIComponent(namespace)}/architectures/${architectureId}/versions/${encodeURIComponent(version)}`,
            baseUrl: config.baseUrl,
            body: payload,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "architectures.create-version",
            path: `/calm/namespaces/${namespace}/architectures/${architectureId}/versions/${version}`
        }), config.outPath);
    });
    return command;
}
