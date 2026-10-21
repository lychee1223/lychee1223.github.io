import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const modules = new Map();

// Compile the pure TypeScript modules with the compiler already used by the site.
// This keeps the tests compatible with the project's Node version without a loader dependency.
export function loadTypeScript(path) {
  const filePath = resolve(projectRoot, path);
  if (modules.has(filePath)) {
    return modules.get(filePath).exports;
  }

  const loadedModule = { exports: {} };
  modules.set(filePath, loadedModule);
  const { outputText } = ts.transpileModule(readFileSync(filePath, "utf8"), {
    fileName: filePath,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });

  function requireModule(specifier) {
    if (specifier.startsWith("@/")) {
      return loadTypeScript(`src/${specifier.slice(2)}.ts`);
    }
    if (specifier.startsWith(".")) {
      return loadTypeScript(resolve(dirname(filePath), `${specifier}.ts`));
    }
    return require(specifier);
  }

  new Function("require", "module", "exports", outputText)(
    requireModule,
    loadedModule,
    loadedModule.exports,
  );
  return loadedModule.exports;
}
