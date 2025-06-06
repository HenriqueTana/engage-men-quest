
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    open: true, // Automatically open browser
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Adiciona suporte a VS Code específico
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    sourcemap: true, // Facilita debugging
    chunkSizeWarningLimit: 1000, // Ajusta limite de aviso para arquivos grandes
  },
}));
