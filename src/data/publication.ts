export const relatedLinkKeys = [
  "ProjectPage",
  "arXiv",
  "Paper",
  "Slides",
  "Poster",
  "Code",
  "Dataset",
  "Article",
  "SpeakerDeck",
] as const;

export type RelatedLinkKey = (typeof relatedLinkKeys)[number];

export const relatedLinkText: Record<RelatedLinkKey, string> = {
  ProjectPage: "Project Page",
  arXiv: "arXiv",
  Paper: "Paper",
  Slides: "Slides",
  Poster: "Poster",
  Code: "Code",
  Dataset: "Dataset",
  Article: "Article",
  SpeakerDeck: "Speaker Deck",
};

export interface RelatedLink {
  key: RelatedLinkKey;
  label: string;
  url: string;
}

export type RelatedLinks = Partial<Record<RelatedLinkKey, string>>;

export interface PublicationAuthor {
  name: string;
  equalContribution?: boolean;
}

export type PublicationCategory =
  | "international-conference"
  | "domestic-conference"
  | "article"
  | "talk";

export interface Publication {
  slug: string;
  title: string;
  authors?: PublicationAuthor[];
  date: string;
  category: PublicationCategory;
  venueFull?: string;
  venueShort?: string;
  venueURL?: string;
  keywords?: string[];
  awards?: string[];
  abstract?: string;
  relatedLinks?: RelatedLinks;
}

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type DataFileModule<T> = {
  default?: T;
} & Record<string, unknown>;

type DataFileContext<T> = {
  keys(): string[];
  (id: string): DataFileModule<T>;
};

declare const require: {
  context<T>(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp,
  ): DataFileContext<T>;
};

function getDataFileExport<T extends object>(module: DataFileModule<T>) {
  if (module.default) {
    return module.default;
  }

  const namedExport = Object.values(module).find(
    (value): value is T => typeof value === "object" && value !== null,
  );

  if (!namedExport) {
    throw new Error("Data file must export an object.");
  }

  return namedExport;
}

const publicationFileContext = require.context<Publication>(
  "./publications",
  true,
  /\.ts$/,
);

export const publicationData: Publication[] = publicationFileContext
  .keys()
  .map((key) => getDataFileExport(publicationFileContext(key)));

function getPublicationSortValue(publication: Publication) {
  const normalizedDate = Number(publication.date.replaceAll("-", ""));

  return Number.isNaN(normalizedDate) ? 0 : normalizedDate;
}

export function sortPublications(publications: Publication[]) {
  return [...publications].sort(
    (left, right) =>
      getPublicationSortValue(right) - getPublicationSortValue(left),
  );
}

export const sortedPublicationData = sortPublications(publicationData);

export const internationalConferencePublications = sortedPublicationData.filter(
  (publication) => publication.category === "international-conference",
);

export const domesticConferencePublications = sortedPublicationData.filter(
  (publication) => publication.category === "domestic-conference",
);

export function isTalkOrArticle(publication: Publication) {
  return publication.category === "article" || publication.category === "talk";
}

export const talkArticlePublications = sortedPublicationData.filter(
  isTalkOrArticle,
);

export function getPublicationBySlug(slug: string) {
  return publicationData.find((publication) => publication.slug === slug);
}

export function getPublicationVenueLabel(publication: Publication) {
  if (!publication.venueFull && !publication.venueShort) {
    return null;
  }

  if (!publication.venueFull) {
    return publication.venueShort ?? null;
  }

  if (
    !publication.venueShort ||
    publication.venueFull === publication.venueShort
  ) {
    return publication.venueFull;
  }

  return `${publication.venueFull} (${publication.venueShort})`;
}

export function getPublicationVenuePrefix(publication: Publication) {
  switch (publication.category) {
    case "article":
      return "Article:";
    case "talk":
      return "Event:";
    default:
      return "Publication:";
  }
}

export function getPublicationListVenueLabel(publication: Publication) {
  return (
    publication.venueShort ??
    publication.venueFull ??
    getPublicationCategoryLabel(publication)
  );
}

export function publicationMatchesVenue(
  publication: Publication,
  venue: string,
) {
  return publication.venueShort === venue || publication.venueFull === venue;
}

export function getPublicationCategoryLabel(publication: Publication) {
  switch (publication.category) {
    case "international-conference":
      return "International Conferences";
    case "domestic-conference":
      return "Domestic Conferences";
    case "article":
      return "Articles";
    case "talk":
      return "Talks";
  }
}

export function getRelatedLinks(
  publication: Publication,
): RelatedLink[] {
  if (!publication.relatedLinks) {
    return [];
  }

  return relatedLinkKeys.flatMap((key) => {
    const url = publication.relatedLinks?.[key];

    return url ? [{ key, label: relatedLinkText[key], url }] : [];
  });
}

export function formatPublicationDate(date?: string) {
  if (!date) {
    return null;
  }

  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (!match) {
    return date;
  }

  const [, year, month] = match;
  const monthIndex = Number(month) - 1;

  if (monthIndex < 0 || monthIndex >= monthNames.length) {
    return date;
  }

  return `${monthNames[monthIndex]} ${year}`;
}
