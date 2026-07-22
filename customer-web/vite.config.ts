import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/icon.svg"],
      manifest: {
        name: "Urinavi",
        short_name: "Urinavi",
        description: "売り場をナビするお客様向けアプリ",
        theme_color: "#008A3D",
        background_color: "#F2FAF5",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^\/api\//,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|webp)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "urinavi-images",
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: true,
    port: 5173,
    // Docker Compose上ではコンテナ名(api)、ホスト直起動ではlocalhostへプロキシする。
    proxy: {
      "/api": {
        target: process.env.VITE_API_PROXY_TARGET || "http://localhost:4000",
        changeOrigin: true,
      },
    },
    watch: {
      // Docker(特にWindows/macOSのbind mount)ではネイティブのファイル監視イベントが
      // 届かないことがあるため、ポーリングで確実にHMRを効かせる。
      usePolling: true,
    },
  },
});
