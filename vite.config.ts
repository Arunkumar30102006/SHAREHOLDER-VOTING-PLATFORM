import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { PurgeCSS } from "purgecss";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function customPurgeCSS(): Plugin {
  return {
    name: "vite-plugin-purgecss",
    enforce: "post",
    async generateBundle(_options, bundle) {
      const cssFiles = Object.keys(bundle).filter((key) => key.endsWith(".css"));
      if (!cssFiles.length) return;
      const purgecss = new PurgeCSS();
      for (const file of cssFiles) {
        const chunk = bundle[file];
        if (chunk && "source" in chunk && chunk.source) {
          const result = await purgecss.purge({
            content: ["./index.html", "./src/**/*.{ts,tsx,html}"],
            css: [{ raw: chunk.source.toString() }],
            safelist: {
              standard: ["html", "body"],
              greedy: [/^swiper/, /^aos/, /^animate/, /^lucide/, /^radix/],
            },
          });
          if (result && result[0]) {
            chunk.source = result[0].css;
          }
        }
      }
    },
  };
}

export default defineConfig(({ isSsrBuild }) => ({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  plugins: [
    react(),
    customPurgeCSS(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: "hidden",
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
    includedRoutes: async (paths) => {
      const blogSlugs = [
        'sebi-compliant-evoting-guide',
        'role-of-scrutinizer-form-mgt-13',
        'agm-remote-evoting-timeline-checklist',
        'how-online-shareholder-voting-works',
        'agm-evoting-vs-physical-meeting',
        'benefits-electronic-voting-shareholders'
      ];
      const blogRoutes = blogSlugs.map(slug => `/blog/${slug}`);
      return Array.from(new Set([...paths, ...blogRoutes]));
    },
  },
}));
