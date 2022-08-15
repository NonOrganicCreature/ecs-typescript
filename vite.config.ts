/// <reference types="vitest" />

import { defineConfig } from "vite";
import { resolve } from "path";

import dts from "vite-plugin-dts";

export default defineConfig({
  test: {
    environment: "happy-dom",
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ecs",
      fileName: "ecs"
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      exclude: resolve(__dirname, "./test"),
      entryRoot: resolve(__dirname, "./src")
    })
  ]
});
