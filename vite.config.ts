/// <reference types="vite/client" />

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig(({ command, mode }) => {
  return {
    plugins: [
      dts(),
      viteStaticCopy({
        targets: [
          {
            src: "./src/models/app-options-model.ts",
            dest: "models",
          },
        ],
      }),
      vue(),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, "src/index.ts"),
        name: "TockVueKit",
        fileName: "tock-vue-kit",
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
      // rollupOptions: {
      //   output: {
      //     // format: "es",
      //     // entryFileNames: `assets/[name].js`,
      //     // chunkFileNames: `assets/[name].js`,
      //     // assetFileNames: `assets/[name].[ext]`,
      //   },
      //   treeshake: true,
      //   // preserveEntrySignatures: 'strict'
      // },
      minify: mode === "production",
    },
  };
});
