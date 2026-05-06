import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        // Vite 8 uses rolldown, which requires manualChunks as a function
        // (not an object). Same outcome: split heavy deps into their own chunks
        // so initial JS payload stays small.
        manualChunks: (id) => {
          if (id.includes('node_modules/three/')) return 'three';
          if (id.includes('node_modules/@react-three/')) return 'r3f';
          if (id.includes('node_modules/gsap/')) return 'gsap';
        },
      },
    },
  },
});
