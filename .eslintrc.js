module.exports = {
   extends: [
      "expo",
      "eslint:recommended",
      "plugin:import/recommended",
      "plugin:import/typescript",
      "plugin:typescript-sort-keys/recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
   ],
   plugins: ["prettier", "react-hooks", "import", "unused-imports", "typescript-sort-keys"],
   rules: {
      "prettier/prettier": "error",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-sort-props": [
         "error",
         {
            ignoreCase: true,
            shorthandFirst: true,
            callbacksLast: true,
         },
      ],
      "react/no-array-index-key": "error",
      "react/no-danger": "error",
      "react/no-unstable-nested-components": "warn",
      "react/jsx-curly-brace-presence": [
         "warn",
         {
            props: "never",
            children: "never",
            propElementValues: "always",
         },
      ],

      // React hooks rules
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn", // Checks effect dependencies

      // ESLint built in rules
      "prefer-const": "error", // If variable never reassigned, use const over let
      "no-console": "error", // Disallow the use of console. statements - use debug
      "no-alert": "error", // Disallow use of alert - use debug
      "sort-vars": ["error", { ignoreCase: true }], // Sort variable declarations in scope block

      // Import rules
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "warn",
      "import/no-unresolved": ["error", { ignore: [".coffee$", ".(scss|less|css)$"] }],
      "import/order": [
         "error",
         {
            "newlines-between": "always",
            groups: [["builtin", "external"], ["internal", "parent", "sibling"], "type"],
            pathGroupsExcludedImportTypes: [],
            alphabetize: {
               order: "asc",
               caseInsensitive: true,
            },
         },
      ],
      "import/first": "warn",
      // Makes usage of things like @bind less clean sadly
      "import/no-named-as-default": "off",
   },
   settings: {
      react: {
         version: "detect",
      },
      "import/parsers": {
         "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
         typescript: {
            alwaysTryTypes: true,
            project: ["tsconfig.json"],
         },
         node: {
            extensions: [".js", ".ts", ".tsx"],
         },
      },
   },
   overrides: [
      {
         files: ["**/*.ts", "**/*.tsx"],
         parser: "@typescript-eslint/parser",
         plugins: ["@typescript-eslint"],
         extends: [
            "plugin:@typescript-eslint/eslint-recommended",
            "plugin:@typescript-eslint/recommended",
         ],
         rules: {
            // Allow defining variables after use (useful for functions and classes)
            "@typescript-eslint/no-use-before-define": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-this-alias": "off",
            "@typescript-eslint/explicit-function-return-type": [
               "warn",
               { allowExpressions: true },
            ],
            "@typescript-eslint/member-delimiter-style": [
               "error",
               {
                  multiline: {
                     delimiter: "none",
                     requireLast: false,
                  },
               },
            ],
         },
      },
   ],
}
