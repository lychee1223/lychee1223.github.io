import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const index = `
  <main id="home">
    <a href="/publications?author=Example">Filter</a>
    <a href="/publications/example#paper">Publication</a>
    <a href="https://lychee1223.github.io/publications/example#paper">Permalink</a>
    <a href="https://lychee1223.github.io/#home">Home</a>
    <a href="/publications/example/slides.pdf">Slides</a>
    <img src="/portrait.png" alt="Portrait">
  </main>
`;

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "site-link-check-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  mkdirSync(join(directory, "out/publications/example"), { recursive: true });
  mkdirSync(join(directory, ".lychee"));
  copyFileSync(
    join(projectRoot, ".lychee/internal.toml"),
    join(directory, ".lychee/internal.toml"),
  );
  writeFileSync(join(directory, "README.md"), "# Fixture\n");
  writeFileSync(join(directory, "out/index.html"), index);
  writeFileSync(
    join(directory, "out/publications.html"),
    '<h1 id="list">Publications</h1>',
  );
  writeFileSync(
    join(directory, "out/publications/example.html"),
    '<h1 id="paper">Publication</h1>',
  );
  writeFileSync(
    join(directory, "out/publications/example/slides.pdf"),
    "PDF asset",
  );
  writeFileSync(join(directory, "out/portrait.png"), "Image asset");
  return directory;
}

function check(directory) {
  const result = spawnSync(
    process.execPath,
    [
      join(projectRoot, "scripts/check-links.mjs"),
      "internal",
      "--format",
      "json",
    ],
    {
      cwd: directory,
      encoding: "utf8",
    },
  );
  assert.ok(result.stdout.trim(), result.stderr);
  return { status: result.status, report: JSON.parse(result.stdout) };
}

test("extensionless pages, query strings, and same-domain anchors resolve despite adjacent asset directories", (t) => {
  const result = check(fixture(t));
  assert.equal(result.status, 0);
  assert.equal(result.report.errors, 0);
  assert.ok(result.report.successful > 0);
});

test("a missing page fails even when its asset directory remains", (t) => {
  const directory = fixture(t);
  rmSync(join(directory, "out/publications/example.html"));
  const result = check(directory);
  assert.notEqual(result.status, 0);
  assert.match(
    JSON.stringify(result.report.error_map),
    /publications\/example/,
  );
});

test("missing images and PDFs fail the check", (t) => {
  const directory = fixture(t);
  rmSync(join(directory, "out/portrait.png"));
  rmSync(join(directory, "out/publications/example/slides.pdf"));
  const result = check(directory);
  assert.notEqual(result.status, 0);
  assert.match(JSON.stringify(result.report.error_map), /portrait\.png/);
  assert.match(JSON.stringify(result.report.error_map), /slides\.pdf/);
});

for (const href of [
  "/publications/example#paper",
  "https://lychee1223.github.io/publications/example#paper",
]) {
  test(`missing anchors fail for ${href}`, (t) => {
    const directory = fixture(t);
    writeFileSync(
      join(directory, "out/index.html"),
      index.replace(
        `href="${href}"`,
        `href="${href.replace("#paper", "#missing")}"`,
      ),
    );
    const result = check(directory);
    assert.notEqual(result.status, 0);
    assert.match(JSON.stringify(result.report.error_map), /#missing/);
  });
}

test("broken local README links fail the check", (t) => {
  const directory = fixture(t);
  writeFileSync(
    join(directory, "README.md"),
    "[Missing document](missing.md)\n",
  );
  const result = check(directory);
  assert.notEqual(result.status, 0);
  assert.match(JSON.stringify(result.report.error_map), /missing\.md/);
});
