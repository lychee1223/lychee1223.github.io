import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const { formatYearMonthDate, formatExperiencePeriod, getDateSortValue } =
  loadTypeScript("src/utils/date.ts");
const { getDataFileExport } = loadTypeScript("src/utils/data-files.ts");

test("date formatting preserves full dates, year-only values, and invalid inputs", () => {
  assert.equal(formatYearMonthDate("2026-10-22"), "Oct 2026");
  assert.equal(
    formatYearMonthDate("2026-10", { month: "long" }),
    "October 2026",
  );
  assert.equal(formatYearMonthDate("2025", { allowYearOnly: true }), "2025");
  assert.equal(formatYearMonthDate("2026-13"), "2026-13");
  assert.equal(formatYearMonthDate("unknown"), "unknown");
  assert.equal(formatYearMonthDate(), null);
  assert.equal(getDateSortValue("2026-10-22"), 20261022);
  assert.equal(getDateSortValue("invalid"), 0);
});

test("experience periods preserve ongoing, single-date, and closed ranges", () => {
  assert.equal(formatExperiencePeriod("2025"), "2025 - Present");
  assert.equal(
    formatExperiencePeriod("2025-04", "2026-01"),
    "Apr 2025 - Jan 2026",
  );
  assert.equal(formatExperiencePeriod("2025-04", "2025-04"), "Apr 2025");
});

test("metadata modules support default and named object exports", () => {
  const item = { slug: "example" };
  assert.equal(getDataFileExport({ default: item, other: {} }), item);
  assert.equal(getDataFileExport({ helper: () => {}, item }), item);
  assert.throws(
    () => getDataFileExport({ empty: null, title: "no object" }),
    /must export an object/,
  );
});
