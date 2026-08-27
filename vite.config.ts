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
        // Exclude heavy lazy chunks from initial page HTML preloads
        return deps.filter(dep =>
          !dep.includes('three') &&
          !dep.includes('pdf') &&
          !dep.includes('supabase') &&
          !dep.includes('charts') &&
          !dep.includes('animation') &&
          !dep.includes('markdown')
        );
      },
    },
    rollupOptions: {
      output: isSsrBuild
        ? {}
        : {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                // Three.js & 3D WebGL (standalone leaf)
                if (/[\\/]node_modules[\\/](three|@react-three|ogl)[\\/]/.test(id)) {
                  return 'three-bundle';
                }
                // PDF & Document Generation (standalone leaf)
                if (/[\\/]node_modules[\\/](jspdf|jspdf-autotable|pdfjs-dist|mammoth|tesseract\.js)[\\/]/.test(id)) {
                  return 'pdf-bundle';
                }
                // Supabase SDK (standalone leaf)
                if (/[\\/]node_modules[\\/]@supabase[\\/]/.test(id)) {
                  return 'supabase-bundle';
                }
                // Charts library (only used on dashboard pages)
                if (/[\\/]node_modules[\\/]recharts[\\/]/.test(id)) {
                  return 'charts-bundle';
                }
                // Animation libraries (deferred, non-critical)
                if (/[\\/]node_modules[\\/](motion|framer-motion|gsap)[\\/]/.test(id)) {
                  return 'animation-bundle';
                }
                // Icon library (large tree, split for better caching)
                if (/[\\/]node_modules[\\/]lucide-react[\\/]/.test(id)) {
                  return 'icons-bundle';
                }
                // Markdown renderer (only used on blog/content pages)
                if (/[\\/]node_modules[\\/]react-markdown[\\/]/.test(id)) {
                  return 'markdown-bundle';
                }
                // i18n runtime (loaded eagerly but cacheable separately)
                if (/[\\/]node_modules[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/.test(id)) {
                  return 'i18n-bundle';
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
