import { getDataFileExport } from "@/utils/data-files";

export type ExperienceMetaContent =
  | string
  | {
      label: string;
      href: string;
    };

export interface ExperienceItem {
  slug: string;
  start: string;
  end?: string;
  organization: string;
  organizationURL?: string;
  titles: string[];
  meta?: ExperienceMetaContent[];
}

const experienceFileContext = require.context<ExperienceItem>(
  "./experiences",
  false,
  /\.ts$/,
);

function getExperienceDateSortValue(value?: string) {
  if (!value) {
    return 0;
  }

  const match = value.match(/^(\d{4})(?:-(\d{2}))?$/);

  if (!match) {
    return 0;
  }

  const year = Number(match[1]);
  const month = match[2] ? Number(match[2]) : 1;

  return year * 100 + month;
}

export const experienceData: ExperienceItem[] = experienceFileContext
  .keys()
  .map((key) => getDataFileExport(experienceFileContext(key)))
  .sort(
    (left, right) =>
      getExperienceDateSortValue(right.start) -
      getExperienceDateSortValue(left.start),
  );
