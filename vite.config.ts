/// <reference types="vite/client" />

import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log("The mode : ", mode);
  return {
    plugins: [vue(), dts()],
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
        // the proper extensions will be added
        fileName: "tock-vue-kit",
        // formats: ["es"],
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
