import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [mode = "internal", ...extraArgs] = process.argv.slice(2);
if (mode !== "internal" && mode !== "external") {
  console.error(
    "Usage: node scripts/check-links.mjs [internal|external] [lychee options]",
  );
  process.exit(1);
}

function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const args = ["--config", `.lychee/${mode}.toml`];
if (mode === "internal") {
  const exportUrl = pathToFileURL(resolve("out")).href;
  const pages = readdirSync("out", { recursive: true })
    .filter((name) => name.endsWith(".html"))
    .map((name) =>
      pathToFileURL(resolve("out", name)).href.slice(exportUrl.length + 1, -5),
    )
    .map(escapePattern);
  const sitePattern = "https?://lychee1223\\.github\\.io";

  // Next.js exports both page.html and page/ (RSC data or PDF assets).
  // Map known extensionless pages before lychee tries directory index files.
  args.push(
    "--remap",
    `^(?:${escapePattern(exportUrl)}|${sitePattern})/(${pages.join("|")})([?#].*)?$ ${exportUrl}/$1.html$2`,
    "--remap",
    `^${sitePattern}(/.*)?$ ${exportUrl}$1`,
  );
}

const result = spawnSync(
  "lychee",
  [...args, ...extraArgs, "out/**/*.html", "README.md"],
  {
    stdio: "inherit",
  },
);
if (result.error) {
  console.error(
    "Could not run lychee. Install it from https://lychee.cli.rs/ and try again.",
  );
  console.error(result.error.message);
}
process.exit(result.status ?? 1);
