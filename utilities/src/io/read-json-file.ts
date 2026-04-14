import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readJsonFile(filePath: string): Promise<unknown> {
  const resolvedPath = path.resolve(filePath);
  const contents = await readFile(resolvedPath, "utf8");

  try {
    return JSON.parse(contents);
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to parse JSON file ${resolvedPath}: ${detail}`);
  }
}
