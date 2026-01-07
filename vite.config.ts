import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import replace from "@rollup/plugin-replace";
import path from "path";
import config from "./config.json";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === "production";

  return {
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
    },
    base: isProduction ? "/tock-vue-kit/" : "/",
    plugins: [
      vue(),
      replace({
        preventAssignment: true,
        values: {
          /**
           * In development, the CSS is already included via the local source of the tock-vue-kit library (main.scss).
           * This replacement prevents Vite from attempting to resolve the production CSS file,
           * which does not exist during development. In production, the import is preserved
           * to load the pre-built CSS from the published library.
           */
          'import "tock-vue-kit/dist/style.css";': isProduction
            ? 'import "tock-vue-kit/dist/style.css";'
            : "",
        },
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("../tock-vue-kit/src", import.meta.url)),
        "tock-vue-kit": isProduction
          ? "tock-vue-kit"
          : fileURLToPath(
              new URL(config.tockVueKit.localPath, import.meta.url)
            ),
      },
      dedupe: ["vue"],
    },
    optimizeDeps: {
      exclude: ["tock-vue-kit"],
    },
    server: {
      fs: {
        allow: [
          path.resolve(__dirname),
          path.resolve(__dirname, "../tock-vue-kit/src"),
          path.resolve(__dirname, "../tock-vue-kit/node_modules"),
        ],
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue"],
          },
        },
      },
    },
  };
});
