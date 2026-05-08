export interface ExperienceItem {
  slug: string;
  start: string;
  end?: string;
  organization: string;
  organizationURL?: string;
  titles: string[];
  meta?: string[];
}

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
    throw new Error("Experience data file must export an object.");
  }

  return namedExport;
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

const experienceMonthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatExperienceDateValue(value: string) {
  const match = value.match(/^(\d{4})(?:-(\d{2}))?$/);

  if (!match) {
    return value;
  }

  const [, year, month] = match;

  if (!month) {
    return year;
  }

  const monthIndex = Number(month) - 1;

  if (monthIndex < 0 || monthIndex >= experienceMonthNames.length) {
    return value;
  }

  return `${experienceMonthNames[monthIndex]} ${year}`;
}

export function formatExperiencePeriod(start: string, end?: string) {
  const formattedStart = formatExperienceDateValue(start);

  if (!end) {
    return `${formattedStart} - Present`;
  }

  if (start === end) {
    return formattedStart;
  }

  return `${formattedStart} - ${formatExperienceDateValue(end)}`;
}

export const experienceData: ExperienceItem[] = experienceFileContext
  .keys()
  .map((key) => getDataFileExport(experienceFileContext(key)))
  .sort(
    (left, right) =>
      getExperienceDateSortValue(right.start) -
      getExperienceDateSortValue(left.start),
  );
