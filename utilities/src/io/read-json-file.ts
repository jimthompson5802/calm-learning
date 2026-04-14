import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readJsonFile(filePath: string): Promise<unknown> {
  const { resolvedPath, contents } = await readJsonText(filePath);

  try {
    return JSON.parse(contents);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse JSON file ${resolvedPath}: ${detail}`);
  }
}

export async function readJsonObjectFile(filePath: string): Promise<Record<string, unknown>> {
  const value = await readJsonFile(filePath);

  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error(`JSON file ${path.resolve(filePath)} must contain a JSON object.`);
  }

  return value as Record<string, unknown>;
}

export async function readJsonStringBody(filePath: string): Promise<string> {
  const value = await readJsonObjectFile(filePath);
  return JSON.stringify(value);
}

async function readJsonText(filePath: string): Promise<{ resolvedPath: string; contents: string }> {
  const resolvedPath = path.resolve(filePath);
  const contents = await readFile(resolvedPath, "utf8");
  return { resolvedPath, contents };
}
