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
    modulePreload: {
      polyfill: false,
      resolveDependencies(filename, deps) {
        // Exclude heavy lazy chunks, WebGL, PDF, Charts, Forms, and Supabase from initial HTML preloads
        return deps.filter(dep =>
          !dep.includes('three') &&
          !dep.includes('doc-tools') &&
          !dep.includes('pdf') &&
          !dep.includes('charts') &&
          !dep.includes('supabase') &&
          !dep.includes('forms') &&
          !dep.includes('motion')
        );
      },
    },
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                // 1. Three.js / WebGL bundle (isolated so never in critical path)
                if (id.includes('three') || id.includes('@react-three')) {
                  return 'three-bundle';
                }
                // 2. Heavy Document & PDF parsing libraries (isolated to reporting / OCR)
                if (id.includes('jspdf') || id.includes('pdfjs-dist') || id.includes('mammoth') || id.includes('tesseract')) {
                  return 'doc-tools-bundle';
                }
                // 3. Heavy Charts (recharts / d3)
                if (id.includes('recharts') || id.includes('d3-')) {
                  return 'charts-bundle';
                }
                // 4. Supabase Client & auth
                if (id.includes('@supabase')) {
                  return 'supabase-bundle';
                }
                // 5. Animation (Motion)
                if (id.includes('/motion') || id.includes('framer-motion')) {
                  return 'motion-bundle';
                }
                // 6. UI / Radix primitives
                if (id.includes('@radix-ui')) {
                  return 'radix-bundle';
                }
                // 7. Forms & validation
                if (id.includes('react-hook-form') || id.includes('@hookform') || id.includes('/zod/')) {
                  return 'forms-bundle';
                }
                // 8. Internationalization (i18n)
                if (id.includes('i18next') || id.includes('react-i18next')) {
                  return 'i18n-bundle';
                }
                // 9. Icons
                if (id.includes('lucide-react')) {
                  return 'icons-bundle';
                }
                // 10. Core React runtime ONLY (exact matching)
                if (
                  id.includes('/react/') ||
                  id.includes('/react-dom/') ||
                  id.includes('/scheduler/') ||
                  id.includes('/react-router/') ||
                  id.includes('/react-router-dom/') ||
                  id.includes('/@tanstack/react-query/') ||
                  id.includes('/react-helmet-async/')
                ) {
                  return 'react-core';
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
