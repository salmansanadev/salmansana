import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { portfolioSeo } from "./scripts/portfolio-seo";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          supabase: ["@supabase/supabase-js"],
          content: ["react-markdown", "react-helmet"],
        },
      },
    },
  },
  server: {
    host: "::",
    allowedHosts: ["terminal.local"],
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), portfolioSeo(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
}));
