import path from "path";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

import { defineConfig } from "vite";

export default function viteConfig() {
  return defineConfig({
    root: path.resolve(__dirname),
    plugins: [
      react(),
      tsconfigPaths()
    ],
    build: {
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      outDir: path.resolve(__dirname, "./dist"),
      rollupOptions: {
        output: {
          manualChunks(id) { // split into chunks
            if (id.includes("node_modules")) {
              if (id.includes("react-dom")) {
                return "react-dom";
              }
              if (id.includes("react-router-dom")) {
                return "react-router-dom";
              }
              if (id.includes("react")) {
                return "react";
              }
            }
            return "vendor"
          }
        }
      }
    },
    server: {
      port: 2999,
      open: true,
    },
  })
}