"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildNamespacesCommand = buildNamespacesCommand;
const commander_1 = require("commander");
const config_1 = require("../config");
const client_1 = require("../http/client");
const format_response_1 = require("../io/format-response");
const read_json_file_1 = require("../io/read-json-file");
const write_output_1 = require("../io/write-output");
const validation_1 = require("../validation");
function buildNamespacesCommand() {
    const command = new commander_1.Command("namespaces").description("Manage calm-hub namespaces.");
    command
        .command("list")
        .description("List namespaces.")
        .action(async (_, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const response = await (0, client_1.requestJson)({
            method: "GET",
            path: "/calm/namespaces",
            baseUrl: config.baseUrl,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "namespaces.list",
            path: "/calm/namespaces"
        }), config.outPath);
    });
    command
        .command("create")
        .description("Create a namespace from a JSON file.")
        .requiredOption("--file <path>", "Path to a namespace JSON file.")
        .action(async (options, actionCommand) => {
        const config = (0, config_1.resolveConfig)(actionCommand.optsWithGlobals());
        const payload = await (0, read_json_file_1.readJsonFile)(options.file);
        assertNamespacePayload(payload, options.file);
        (0, validation_1.assertNamespace)(payload.name);
        const response = await (0, client_1.requestJson)({
            method: "POST",
            path: "/calm/namespaces",
            baseUrl: config.baseUrl,
            body: payload,
            timeoutMs: config.timeoutMs,
            verbose: config.verbose
        });
        await (0, write_output_1.writeOutput)((0, format_response_1.formatCommandOutput)(response, {
            action: "namespaces.create",
            path: "/calm/namespaces"
        }), config.outPath);
    });
    return command;
}
function assertNamespacePayload(payload, source) {
    if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
        throw new Error(`Namespace file ${source} must contain a JSON object.`);
    }
    const record = payload;
    if (typeof record.name !== "string" || record.name.trim() === "") {
        throw new Error(`Namespace file ${source} must include a non-empty string "name".`);
    }
    if (typeof record.description !== "string" || record.description.trim() === "") {
        throw new Error(`Namespace file ${source} must include a non-empty string "description".`);
    }
}
