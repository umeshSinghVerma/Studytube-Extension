// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { viteStaticCopy } from "file:///home/project/node_modules/vite-plugin-static-copy/dist/index.js";
import { resolve } from "path";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: "src/chrome-extension/manifest.json", dest: "." },
        { src: "src/chrome-extension/logo.png", dest: "." },
        { src: "src/chrome-extension/contentcss.css", dest: "." }
      ]
    })
  ],
  server: {
    open: "/popup-local.html"
  },
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__vite_injected_original_dirname, "popup.html"),
        background: resolve(__vite_injected_original_dirname, "src/chrome-extension/background.js"),
        content: resolve(__vite_injected_original_dirname, "src/chrome-extension/content.js")
      },
      output: {
        entryFileNames: "[name].js"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHsgdml0ZVN0YXRpY0NvcHkgfSBmcm9tIFwidml0ZS1wbHVnaW4tc3RhdGljLWNvcHlcIjtcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHJlYWN0KCksXG4gICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgdGFyZ2V0czogW1xuICAgICAgICB7IHNyYzogXCJzcmMvY2hyb21lLWV4dGVuc2lvbi9tYW5pZmVzdC5qc29uXCIsIGRlc3Q6IFwiLlwiIH0sXG4gICAgICAgIHsgc3JjOiBcInNyYy9jaHJvbWUtZXh0ZW5zaW9uL2xvZ28ucG5nXCIsIGRlc3Q6IFwiLlwiIH0sXG4gICAgICAgIHsgc3JjOiBcInNyYy9jaHJvbWUtZXh0ZW5zaW9uL2NvbnRlbnRjc3MuY3NzXCIsIGRlc3Q6IFwiLlwiIH0sXG4gICAgICBdLFxuICAgIH0pLFxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiBcIi9wb3B1cC1sb2NhbC5odG1sXCIsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgaW5wdXQ6IHtcbiAgICAgICAgcG9wdXA6IHJlc29sdmUoX19kaXJuYW1lLCBcInBvcHVwLmh0bWxcIiksXG4gICAgICAgIGJhY2tncm91bmQ6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jaHJvbWUtZXh0ZW5zaW9uL2JhY2tncm91bmQuanNcIiksXG4gICAgICAgIGNvbnRlbnQ6IHJlc29sdmUoX19kaXJuYW1lLCBcInNyYy9jaHJvbWUtZXh0ZW5zaW9uL2NvbnRlbnQuanNcIiksXG4gICAgICB9LFxuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiBcIltuYW1lXS5qc1wiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUNsQixTQUFTLHNCQUFzQjtBQUMvQixTQUFTLGVBQWU7QUFIeEIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sZUFBZTtBQUFBLE1BQ2IsU0FBUztBQUFBLFFBQ1AsRUFBRSxLQUFLLHNDQUFzQyxNQUFNLElBQUk7QUFBQSxRQUN2RCxFQUFFLEtBQUssaUNBQWlDLE1BQU0sSUFBSTtBQUFBLFFBQ2xELEVBQUUsS0FBSyx1Q0FBdUMsTUFBTSxJQUFJO0FBQUEsTUFDMUQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0wsT0FBTyxRQUFRLGtDQUFXLFlBQVk7QUFBQSxRQUN0QyxZQUFZLFFBQVEsa0NBQVcsb0NBQW9DO0FBQUEsUUFDbkUsU0FBUyxRQUFRLGtDQUFXLGlDQUFpQztBQUFBLE1BQy9EO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
