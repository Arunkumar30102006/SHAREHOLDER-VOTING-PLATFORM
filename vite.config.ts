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
        // Exclude heavy lazy chunks and auth chunks from initial page HTML preloads
        return deps.filter(dep => !dep.includes('three') && !dep.includes('pdf') && !dep.includes('supabase'));
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
