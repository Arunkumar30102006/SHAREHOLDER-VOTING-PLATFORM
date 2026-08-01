import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  plugins: [
    react(),
    // Prerender public pages at build time for SEO
    // This generates static HTML files with actual content for each route
    mode === 'production' && prerender({
      routes: [
        '/',
        '/about',
        '/contact',
        '/security',
        '/privacy-policy',
        '/terms-of-service',
        '/sebi-compliance',
        '/data-protection',
      ],
      renderer: '@prerenderer/renderer-jsdom',
      rendererOptions: {
        renderAfterTime: 5000, // Wait 5s for content to render
      },
      postProcess(renderedRoute) {
        // Fix SPA routing — ensure all prerendered pages still work with client-side routing
        renderedRoute.html = renderedRoute.html.replace(
          /<script type="module"/g,
          '<script type="module" defer'
        );
        return renderedRoute;
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          supabase: ['@supabase/supabase-js'],
          ui: ['framer-motion', 'lucide-react', 'clsx', 'tailwind-merge'],
        },
      },
    },
  },
}));
