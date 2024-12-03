// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  i18n: {
    defaultLocale: "pt-br",
    locales: ["pt-br", "en"],
    routing: "manual",
  },

  output: "server",

  adapter: node({
    mode: "standalone",
  }),
});
