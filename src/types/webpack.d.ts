import type { DataFileContext } from "@/utils/data-files";

declare global {
  namespace NodeJS {
    interface Require {
      context<T>(
        directory: string,
        useSubdirectories?: boolean,
        regExp?: RegExp,
      ): DataFileContext<T>;
    }
  }
}
