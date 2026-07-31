import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import prerender from "@prerenderer/rollup-plugin";
import JSDOMRenderer from "@prerenderer/renderer-jsdom";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: false,
  },
  plugins: [
    react(),
    mode === 'production' && prerender({
      routes: [
        '/',
        '/about',
        '/features',
        '/pricing',
        '/contact'
      ],
      renderer: new JSDOMRenderer({
        renderAfterDocumentEvent: 'custom-render-trigger',
      })
    })
  ],
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
