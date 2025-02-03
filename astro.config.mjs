// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "http://localhost:4321", // TODO: alter to production
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  i18n: {
    defaultLocale: "pt-br",
    locales: ["pt-br", "en", "pt", "en-us"],
    routing: "manual",
  },

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});
