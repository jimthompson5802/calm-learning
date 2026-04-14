import { writeFile } from "node:fs/promises";

export async function writeOutput(data: unknown, outPath?: string): Promise<void> {
  const rendered = renderOutput(data);
  process.stdout.write(`${rendered}\n`);

  if (outPath) {
    await writeFile(outPath, `${rendered}\n`, "utf8");
  }
}

export function renderOutput(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }

  return JSON.stringify(data, null, 2);
}
