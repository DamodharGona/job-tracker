import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export async function convertDocumentToMarkdown(
  filePath: string,
): Promise<string> {
  const command = process.env.MARKITDOWN_COMMAND ?? "markitdown";

  const { stdout } = await execFileAsync(command, [filePath], {
    maxBuffer: 10 * 1024 * 1024,
    timeout: 30_000,
  });

  const markdown = stdout.trim();

  if (!markdown) {
    throw new Error("No text could be extracted from the uploaded document");
  }

  return markdown;
}
