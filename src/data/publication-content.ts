import { readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

function findPublicationContentPaths(directory: string): string[] {
  const entries = readdirSync(directory, { withFileTypes: true });
  const paths: string[] = [];

  for (const entry of entries) {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) {
      paths.push(...findPublicationContentPaths(entryPath));
      continue;
    }

    if (entry.isFile() && entry.name === "content.md") {
      paths.push(entryPath);
    }
  }

  return paths;
}

const publicationContentDirectory = join(
  process.cwd(),
  "src",
  "data",
  "publications",
);

const publicationContentBySlug = new Map(
  findPublicationContentPaths(publicationContentDirectory).map((filePath) => {
    const relativePath = relative(publicationContentDirectory, filePath);
    const slug = relativePath.split(sep).at(-2);

    if (!slug) {
      throw new Error(`Invalid publication content path: ${relativePath}`);
    }

    return [slug, readFileSync(filePath, "utf8")] as const;
  }),
);

export function getPublicationContentBySlug(slug: string) {
  return publicationContentBySlug.get(slug) ?? null;
}
