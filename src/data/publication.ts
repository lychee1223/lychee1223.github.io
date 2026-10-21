import { getDataFileExport } from "@/utils/data-files";
import {
  isTalkOrArticle,
  sortPublications,
  type Publication,
} from "@/lib/publications";

// Keep metadata files and documented type imports compatible.
export type {
  Publication,
  PublicationAuthor,
  PublicationCategory,
  RelatedLinks,
} from "@/lib/publications";

const publicationFileContext = require.context<Publication>(
  "./publications",
  true,
  /\.ts$/,
);

export const publicationData: Publication[] = publicationFileContext
  .keys()
  .map((key) => getDataFileExport(publicationFileContext(key)));

export const sortedPublicationData = sortPublications(publicationData);

export const internationalConferencePublications = sortedPublicationData.filter(
  (publication) => publication.category === "international-conference",
);

export const domesticConferencePublications = sortedPublicationData.filter(
  (publication) => publication.category === "domestic-conference",
);

export const preprintPublications = sortedPublicationData.filter(
  (publication) => publication.category === "preprint",
);

export const talkArticlePublications =
  sortedPublicationData.filter(isTalkOrArticle);

export function getPublicationBySlug(slug: string) {
  return publicationData.find((publication) => publication.slug === slug);
}
