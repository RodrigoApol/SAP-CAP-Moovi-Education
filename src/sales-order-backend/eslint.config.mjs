import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{mjs,js,ts}"],
    // plugins: {
    //   js,
    // },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended
    ],
    languageOptions: {
      globals: globals.node
    },
    ignores: [".gen/*.{js,ts}", "node_modules/**"],
    // ...tseslint.configs.recommended,
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^ignore",
          ignoreRestSiblings: true
        }
      ],
      "eol-last": "error",
      // ident: [
      //   'error',
      //   4,
      //   {
      //     SwitchCase: 1
      //   }
      // ],
      "max-len": ["warn", 130],
      "max-lines-per-function": ["warn", 30],
      "object-curly-spacing": ["error", "always"],
      quotes: ["warn", "double"],
      "quote-props": ["error", "as-needed"],
      semi: ["error", "always"],
      "sort-imports": [
        "warn",
        {
          memberSyntaxSortOrder: ["single", "all", "multiple", "none"],
          allowSeparatedGroups: true
        }
      ]
    }
  }
]);
