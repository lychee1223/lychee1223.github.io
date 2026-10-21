import assert from "node:assert/strict";
import test from "node:test";
import { loadTypeScript } from "./load-typescript.mjs";

const {
  sortPublications,
  getRelatedLinks,
  getPublicationVenueLabel,
  toPublicationListItem,
} = loadTypeScript("src/lib/publications.ts");
const { getPublicationFilter } = loadTypeScript(
  "src/lib/publication-filters.ts",
);
const { ownAuthorName } = loadTypeScript("src/data/authors.ts");

function publication(slug, overrides = {}) {
  return {
    slug,
    title: slug,
    date: "2026-01-01",
    category: "preprint",
    ...overrides,
  };
}

test("the client list excludes detail-only data and preserves filter/display fields", () => {
  const original = publication("example", {
    authors: [{ name: ownAuthorName }],
    keywords: ["Vision"],
    abstract: "Long abstract",
    relatedLinks: { Paper: "/paper.pdf" },
  });
  const item = toPublicationListItem(original);
  assert.equal(item.title, original.title);
  assert.deepEqual(item.authors, original.authors);
  assert.deepEqual(item.keywords, original.keywords);
  assert.equal("abstract" in item, false);
  assert.equal("relatedLinks" in item, false);
  assert.equal(original.abstract, "Long abstract");
});

test("publications sort by date, then authorship at the same venue, without mutating input", () => {
  const venue = { venueShort: "Example 2026" };
  const items = [
    publication("absent", { ...venue, authors: [{ name: "Other" }] }),
    publication("coauthor", {
      ...venue,
      authors: [{ name: "Other" }, { name: ownAuthorName }],
    }),
    publication("equal", {
      ...venue,
      authors: [
        { name: "Other", equalContribution: true },
        { name: ownAuthorName, equalContribution: true },
      ],
    }),
    publication("first", { ...venue, authors: [{ name: ownAuthorName }] }),
    publication("newest", { date: "2026-02-01" }),
  ];
  const original = [...items];
  assert.deepEqual(
    sortPublications(items).map((item) => item.slug),
    ["newest", "first", "equal", "coauthor", "absent"],
  );
  assert.deepEqual(items, original);
});

test("same-date items at different venues retain their original order", () => {
  const items = [
    publication("a", { venueShort: "A" }),
    publication("b", { venueShort: "B", authors: [{ name: ownAuthorName }] }),
  ];
  assert.deepEqual(sortPublications(items), items);
});

test("filters preserve author, category, keyword, venue priority", () => {
  const item = publication("example", {
    authors: [{ name: "Alice" }],
    keywords: ["Vision"],
    venueShort: "VC",
  });
  const cases = [
    [
      "author=Alice&category=talk&keyword=Other&venue=Other",
      "Author: Alice",
      true,
    ],
    ["author=Bob&category=preprint", "Author: Bob", false],
    ["category=preprint&keyword=Other", "Category: Preprints", true],
    ["category=unknown&keyword=Vision&venue=Other", "Keyword: Vision", true],
    ["keyword=Other&venue=VC", "Keyword: Other", false],
    ["venue=VC", "Venue: VC", true],
    ["author=&category=unknown", "All Publications", true],
    ["category=toString", "All Publications", true],
  ];
  for (const [query, label, matches] of cases) {
    const filter = getPublicationFilter(new URLSearchParams(query));
    assert.equal(filter.label, label);
    assert.equal(filter.matches(item), matches);
  }
});

test("each publication category and both talks/articles aliases are supported", () => {
  const labels = {
    "international-conference": "International Conferences",
    "domestic-conference": "Domestic Conferences",
    preprint: "Preprints",
    article: "Articles",
    talk: "Talks",
    "talks-articles": "Talks & Articles",
    material: "Talks & Articles",
  };
  for (const [category, label] of Object.entries(labels)) {
    const filter = getPublicationFilter(new URLSearchParams({ category }));
    assert.equal(filter.label, `Category: ${label}`);
    if (category === "talks-articles" || category === "material") {
      assert.equal(
        filter.matches(publication("talk", { category: "talk" })),
        true,
      );
      assert.equal(
        filter.matches(publication("article", { category: "article" })),
        true,
      );
      assert.equal(filter.matches(publication("preprint")), false);
    } else {
      assert.equal(filter.matches(publication(category, { category })), true);
      assert.equal(
        filter.matches(publication("different", { category: "other" })),
        false,
      );
    }
  }
});

test("optional author/keyword fields and both venue names filter correctly", () => {
  const item = publication("example", {
    venueShort: "VC",
    venueFull: "Vision Conference",
  });
  for (const query of ["author=Alice", "keyword=Vision"]) {
    assert.equal(
      getPublicationFilter(new URLSearchParams(query)).matches(item),
      false,
    );
  }
  for (const venue of ["VC", "Vision Conference"]) {
    assert.equal(
      getPublicationFilter(new URLSearchParams({ venue })).matches(item),
      true,
    );
  }
});

test("related links retain their established order and labels", () => {
  const item = publication("example", {
    relatedLinks: {
      Poster: "/poster.pdf",
      Paper: "/paper.pdf",
      ProjectPage: "https://example.com",
    },
  });
  assert.deepEqual(getRelatedLinks(item), [
    { key: "ProjectPage", label: "Project Page", url: "https://example.com" },
    { key: "Paper", label: "Paper", url: "/paper.pdf" },
    { key: "Poster", label: "Poster", url: "/poster.pdf" },
  ]);
  assert.deepEqual(getRelatedLinks(publication("empty")), []);
  assert.equal(
    getPublicationVenueLabel(
      publication("same", { venueFull: "VC", venueShort: "VC" }),
    ),
    "VC",
  );
  assert.equal(
    getPublicationVenueLabel(
      publication("both", { venueFull: "Vision Conference", venueShort: "VC" }),
    ),
    "Vision Conference (VC)",
  );
});
