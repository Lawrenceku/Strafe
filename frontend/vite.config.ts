import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, 'frontend'), // Explicitly set the root to your frontend folder
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'frontend/src') // Adjusted alias to point to the correct location
    }
  },
  build: {
    outDir: path.resolve(__dirname, 'frontend/dist'), // Specify the output directory for the build
    emptyOutDir: true, // Empty the output directory before building
  },
});
