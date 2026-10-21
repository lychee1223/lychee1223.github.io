import {
  isTalkOrArticle,
  publicationMatchesVenue,
  type Publication,
} from "@/lib/publications";

const categoryFilterLabels = {
  "international-conference": "International Conferences",
  "domestic-conference": "Domestic Conferences",
  preprint: "Preprints",
  article: "Articles",
  talk: "Talks",
  "talks-articles": "Talks & Articles",
  material: "Talks & Articles",
} as const;

type FilterCategory = keyof typeof categoryFilterLabels;

interface PublicationFilter {
  label: string;
  matches: (publication: Publication) => boolean;
}

function isFilterCategory(value: string | null): value is FilterCategory {
  return value !== null && Object.hasOwn(categoryFilterLabels, value);
}

// Preserve the URL's existing priority: author, category, keyword, then venue.
export function getPublicationFilter(
  searchParams: Pick<URLSearchParams, "get">,
): PublicationFilter {
  const author = searchParams.get("author");
  if (author) {
    return {
      label: `Author: ${author}`,
      matches: (publication) =>
        publication.authors?.some((item) => item.name === author) ?? false,
    };
  }

  const category = searchParams.get("category");
  if (isFilterCategory(category)) {
    return {
      label: `Category: ${categoryFilterLabels[category]}`,
      matches:
        category === "talks-articles" || category === "material"
          ? isTalkOrArticle
          : (publication) => publication.category === category,
    };
  }

  const keyword = searchParams.get("keyword");
  if (keyword) {
    return {
      label: `Keyword: ${keyword}`,
      matches: (publication) =>
        publication.keywords?.includes(keyword) ?? false,
    };
  }

  const venue = searchParams.get("venue");
  if (venue) {
    return {
      label: `Venue: ${venue}`,
      matches: (publication) => publicationMatchesVenue(publication, venue),
    };
  }

  return { label: "All Publications", matches: () => true };
}
