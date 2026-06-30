#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const usage = `Usage:
  npm run news:add -- venue "MIPR 2026"
  npm run news:add -- talk kawada2026ai4science
  npm run news:add -- manual 2026-08-09 "Custom news title." "Item title" "/publications/slug"
`;

function escapeString(value) {
  return value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
}

function loadTypeScriptModule(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  });
  const module = { exports: {} };
  const context = {
    exports: module.exports,
    module,
    require(specifier) {
      throw new Error(`Unsupported import in ${filePath}: ${specifier}`);
    },
  };

  vm.runInNewContext(transpiled.outputText, context, { filename: filePath });

  return module.exports;
}

function getExportedObject(moduleExports) {
  const exportedObject = Object.values(moduleExports).find(
    (value) => typeof value === "object" && value !== null,
  );

  if (!exportedObject) {
    throw new Error("Expected a data object export.");
  }

  return exportedObject;
}

function walkFiles(directoryPath) {
  return fs.readdirSync(directoryPath, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      return walkFiles(fullPath);
    }

    return [fullPath];
  });
}

function loadOwnAuthorName() {
  const authorsPath = path.join(process.cwd(), "src/data/authors.ts");
  const moduleExports = loadTypeScriptModule(authorsPath);

  if (typeof moduleExports.ownAuthorName !== "string") {
    throw new Error("Could not read ownAuthorName from src/data/authors.ts");
  }

  return moduleExports.ownAuthorName;
}

function loadPublications() {
  const publicationsDirectory = path.join(process.cwd(), "src/data/publications");
  const metadataPaths = walkFiles(publicationsDirectory).filter((filePath) =>
    filePath.endsWith("/metadata.ts"),
  );

  return metadataPaths.map((filePath) =>
    getExportedObject(loadTypeScriptModule(filePath)),
  );
}

function buildVenueEntry(venue, publications) {
  const matchedPublications = publications.filter(
    (publication) =>
      publication.venueShort === venue || publication.venueFull === venue,
  );

  if (matchedPublications.length === 0) {
    throw new Error(`No publications found for venue: ${venue}`);
  }

  matchedPublications.sort((left, right) => right.date.localeCompare(left.date));

  const category = matchedPublications[0].category;
  const title =
    category === "international-conference"
      ? matchedPublications.length === 1
        ? `🎉 Our paper has been accepted to ${venue}!`
        : `🎉 Our papers have been accepted to ${venue}!`
      : matchedPublications.length === 1
        ? `🗣️ We presented a paper at ${venue}!`
        : `🗣️ We presented ${matchedPublications.length} papers at ${venue}!`;

  return {
    date: matchedPublications[0].date,
    title,
    items: matchedPublications.map((publication) => ({
      title: publication.title,
      href: `/publications/${publication.slug}`,
    })),
  };
}

function buildTalkEntry(slug, publications) {
  const publication = publications.find((entry) => entry.slug === slug);

  if (!publication) {
    throw new Error(`No publication found for slug: ${slug}`);
  }

  const venueLabel = publication.venueShort ?? publication.venueFull;
  const title = venueLabel
    ? `🎤 I gave a talk at ${venueLabel}!`
    : `🎤 I gave a talk on ${publication.title}!`;

  return {
    date: publication.date,
    title,
    items: [
      {
        title: publication.title,
        href: `/publications/${publication.slug}`,
      },
    ],
  };
}

function buildManualEntry(args) {
  const [date, title, ...itemArgs] = args;

  if (!date || !title) {
    throw new Error("Manual entries require date and title.");
  }

  if (itemArgs.length % 2 !== 0) {
    throw new Error("Manual entry items require title/href pairs.");
  }

  const items = [];

  for (let index = 0; index < itemArgs.length; index += 2) {
    items.push({
      title: itemArgs[index],
      href: itemArgs[index + 1],
    });
  }

  return { date, title, items };
}

function formatEntry(entry) {
  return [
    "  {",
    `    date: "${escapeString(entry.date)}",`,
    `    title: "${escapeString(entry.title)}",`,
    entry.items.length === 0
      ? "    items: [],"
      : [
          "    items: [",
          ...entry.items.flatMap((item) => [
            "      {",
            `        title: "${escapeString(item.title)}",`,
            `        href: "${escapeString(item.href)}",`,
            "      },",
          ]),
          "    ],",
        ].join("\n"),
    "  },",
  ].join("\n");
}

function buildEntry(args) {
  const [type, ...rest] = args;
  const publications = loadPublications();

  if (type === "venue") {
    const venue = rest[0];

    if (!venue) {
      throw new Error("Venue name is required.");
    }

    return buildVenueEntry(venue, publications);
  }

  if (type === "talk") {
    const slug = rest[0];

    if (!slug) {
      throw new Error("Talk slug is required.");
    }

    return buildTalkEntry(slug, publications);
  }

  if (type === "manual") {
    return buildManualEntry(rest);
  }

  throw new Error(`Unknown news entry type: ${type}`);
}

function main() {
  const entry = buildEntry(process.argv.slice(2));
  const newsFilePath = path.join(process.cwd(), "src/data/news.ts");
  const source = fs.readFileSync(newsFilePath, "utf8");
  const anchor = "export const newsItems: NewsItem[] = [";
  const anchorIndex = source.indexOf(anchor);

  if (anchorIndex < 0) {
    throw new Error("Could not find newsItems array.");
  }

  const arrayCloseIndex = source.indexOf("\n].sort(", anchorIndex);

  if (arrayCloseIndex < 0) {
    throw new Error("Could not find the end of newsItems array.");
  }

  if (
    source.includes(`date: "${escapeString(entry.date)}"`) &&
    source.includes(`title: "${escapeString(entry.title)}"`)
  ) {
    console.log(`Entry already exists in ${newsFilePath}`);
    return;
  }

  const formattedEntry = formatEntry(entry);
  const nextSource =
    source.slice(0, arrayCloseIndex) +
    `\n${formattedEntry}` +
    source.slice(arrayCloseIndex);

  fs.writeFileSync(newsFilePath, nextSource);
  console.log(`Added news entry to ${newsFilePath}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  console.error(`\n${usage}`);
  process.exitCode = 1;
}
