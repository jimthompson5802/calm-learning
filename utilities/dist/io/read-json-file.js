"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonFile = readJsonFile;
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
async function readJsonFile(filePath) {
    const resolvedPath = node_path_1.default.resolve(filePath);
    const contents = await (0, promises_1.readFile)(resolvedPath, "utf8");
    try {
        return JSON.parse(contents);
    }
    catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        throw new Error(`Failed to parse JSON file ${resolvedPath}: ${detail}`);
    }
}
