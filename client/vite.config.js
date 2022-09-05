import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  build: {
    outDir: "build",
  },
  loader: {
    ".js": "jsx",
  },
  plugins: [
    reactRefresh(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      },
    }),
    VitePWA({
      manifest: {
        short_name: "Employee Directory",
        name: "EmDir",
        start_url: "/",
        display: "standalone",
        theme_color: "#162447",
        background_color: "#e43f5a",
      },
      manifestFilename: "manifest.json",
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "moojig_resume.pdf",
      ],
    }),
  ],
});
