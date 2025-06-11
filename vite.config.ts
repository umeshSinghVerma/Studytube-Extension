import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/chrome-extension/manifest.json", dest: "." },
        { src: "src/chrome-extension/projectLogo.png", dest: "." },
        { src: "src/chrome-extension/contentcss.css", dest: "." },
      ],
    }),
  ],
  server: {
    open: "/popup-local.html",
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, "popup.html"),
        background: resolve(__dirname, "src/chrome-extension/background.js"),
        content: resolve(__dirname, "src/chrome-extension/content.js"),
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
