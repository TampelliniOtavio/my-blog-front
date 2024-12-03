/** @type {import("prettier").Config} */
export default {
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  useTabs: false,
  endOfLine: "lf",
  trailingComma: "all",
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      files: "*.{mjs,json}",
      options: {
        tabWidth: 2,
      },
    },
  ],
};
