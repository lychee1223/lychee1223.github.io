import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";

const eslintConfig = [
  {
    ignores: [".next/**", "out/**", "dist/**", "build/**", "coverage/**"],
  },
  ...nextVitals,
  ...nextTypeScript,
  prettier,
];

export default eslintConfig;
