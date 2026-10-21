import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const scriptPath = fileURLToPath(
  new URL("../scripts/add-news-entry.mjs", import.meta.url),
);

test("manual news needs no publication data, escapes strings, and does not add duplicates", () => {
  const directory = mkdtempSync(join(tmpdir(), "news-cli-test-"));
  try {
    mkdirSync(join(directory, "src/data"), { recursive: true });
    const newsPath = join(directory, "src/data/news.ts");
    writeFileSync(
      newsPath,
      "export const newsItems: NewsItem[] = [\n].sort((a, b) => b.date.localeCompare(a.date));\n",
    );
    const title = 'Quotes "and" a newline\nwith \\backslashes';
    const args = [
      "manual",
      "2026-10-22",
      title,
      "Item",
      "/publications/example",
    ];
    const run = (...items) =>
      spawnSync(process.execPath, [scriptPath, ...items], {
        cwd: directory,
        encoding: "utf8",
      });
    const result = run(...args);
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(loadTypeScript(newsPath).newsItems, [
      {
        date: "2026-10-22",
        title,
        items: [{ title: "Item", href: "/publications/example" }],
      },
    ]);
    const source = readFileSync(newsPath, "utf8");
    assert.equal(run(...args).status, 0);
    assert.equal(readFileSync(newsPath, "utf8"), source);
    assert.equal(run("manual", "2026-10-22", "Invalid", "unpaired").status, 1);
    assert.equal(readFileSync(newsPath, "utf8"), source);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
