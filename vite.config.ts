import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  server: {
    host: "127.0.0.1",
    port: 5000,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (["react/", "react-dom/", "react-router-dom/", "scheduler/"].some(p => id.includes("/node_modules/" + p))) {
              return "vendor-react";
            }
            if (id.includes("/@supabase/")) return "vendor-supabase";
            if (id.includes("/@radix-ui/")) return "vendor-ui";
            if (id.includes("/ai/") || id.includes("/@ai-sdk/")) return "vendor-ai";
            if (id.includes("/recharts/") || id.includes("/d3") || id.includes("/victory")) return "vendor-charts";
            if (
              id.includes("/zod/") ||
              id.includes("/date-fns/") ||
              id.includes("/clsx/") ||
              id.includes("/class-variance-authority/") ||
              id.includes("/tailwind-merge/") ||
              id.includes("/sonner/") ||
              id.includes("/cmdk/") ||
              id.includes("/vaul/") ||
              id.includes("/input-otp/") ||
              id.includes("/embla-carousel") ||
              id.includes("/@hookform/")
            ) {
              return "vendor-misc";
            }
          }
        },
      },
    },
  },
});
