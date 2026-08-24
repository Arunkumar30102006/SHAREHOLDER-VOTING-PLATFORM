import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
                  return 'react-core';
                }
                if (id.includes('three') || id.includes('@react-three')) {
                  return 'three-bundle';
                }
                if (id.includes('jspdf') || id.includes('html2canvas')) {
                  return 'pdf-bundle';
                }
                if (id.includes('@supabase')) {
                  return 'supabase-bundle';
                }
                if (id.includes('lucide-react')) {
                  return 'icons';
                }
                if (id.includes('motion')) {
                  return 'motion-bundle';
                }
              }
            },
          },
    },
  },
  // vite-react-ssg: static site generation options
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    entry: 'src/main.tsx',
  },
}));
