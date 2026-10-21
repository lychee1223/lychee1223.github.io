type DataFileModule<T> = {
  default?: T;
} & Record<string, unknown>;

export interface DataFileContext<T> {
  keys(): string[];
  (id: string): DataFileModule<T>;
}

export function getDataFileExport<T extends object>(module: DataFileModule<T>) {
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
