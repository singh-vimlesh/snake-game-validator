// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "typescript-eslint";


// export default [
//   {files: ["**/*.{js,mjs,cjs,ts}"]},
//   {languageOptions: { globals: globals.browser }},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
// ];

// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tseslint from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser";

// import globals from "globals";
// import pluginJs from "@eslint/js";
// import tsPlugin from "@typescript-eslint/eslint-plugin";
// import tsParser from "@typescript-eslint/parser"; // Import the TypeScript parser

// export default [
//   {
//     files: ["src/**/*.{js,ts}"], // Match JavaScript and TypeScript files in the src directory
//     languageOptions: {
//       parser: tsParser, // Set TypeScript parser
//       globals: globals.browser,
//     },
//     plugins: {
//       '@typescript-eslint': tsPlugin, // Register TypeScript plugin
//     },
//     rules: {
//       // Add your custom rules here, or use recommended ones from plugins
//     },
//   },
//   pluginJs.configs.recommended, // Use the recommended JS rules
//   tsPlugin.configs.recommended, // Use the recommended TypeScript rules
// ];
import globals from "globals";
import pluginJs from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      "node_modules",
      "dist"
    ],
    env: {
      "jest": true
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      // Core recommended rules from ESLint
      ...pluginJs.configs.recommended.rules,
      // TypeScript recommended rules
      ...tseslint.configs.recommended.rules,

      // Custom rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "argsIgnorePattern": "^_", // Ignore unused function arguments starting with "_"
          "varsIgnorePattern": "^_"  // Ignore unused variables starting with "_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn", // Change this to "error" if you want stricter rules
    },
  }
];

