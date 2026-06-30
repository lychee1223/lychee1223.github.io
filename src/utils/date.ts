const shortMonthNames = [
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

const longMonthNames = [
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

type MonthFormat = "short" | "long";

interface FormatYearMonthDateOptions {
  month?: MonthFormat;
  allowYearOnly?: boolean;
}

export function formatYearMonthDate(
  value?: string,
  { month = "short", allowYearOnly = false }: FormatYearMonthDateOptions = {},
) {
  if (!value) {
    return null;
  }

  const match = allowYearOnly
    ? value.match(/^(\d{4})(?:-(\d{2}))?$/)
    : value.match(/^(\d{4})-(\d{2})(?:-\d{2})?$/);

  if (!match) {
    return value;
  }

  const [, year, monthValue] = match;

  if (!monthValue) {
    return year;
  }

  const monthIndex = Number(monthValue) - 1;
  const monthNames = month === "long" ? longMonthNames : shortMonthNames;

  if (monthIndex < 0 || monthIndex >= monthNames.length) {
    return value;
  }

  return `${monthNames[monthIndex]} ${year}`;
}
