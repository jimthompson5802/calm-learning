"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutput = writeOutput;
exports.renderOutput = renderOutput;
const promises_1 = require("node:fs/promises");
async function writeOutput(data, outPath) {
    const rendered = renderOutput(data);
    process.stdout.write(`${rendered}\n`);
    if (outPath) {
        await (0, promises_1.writeFile)(outPath, `${rendered}\n`, "utf8");
    }
}
function renderOutput(data) {
    if (typeof data === "string") {
        return data;
    }
    return JSON.stringify(data, null, 2);
}
