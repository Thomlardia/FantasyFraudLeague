import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite config tailored to coexist with CRA
// - Keeps CRA env var usage by defining process.env.REACT_APP_USE_EMULATORS at build time
// - Serves on port 3000 to match CRA defaults
export default defineConfig(() => ({
  plugins: [
    // Enable React fast-refresh and JSX transform
    react({ jsxRuntime: 'automatic' }),
  ],
  // Ensure .js files in src with JSX are transformed
  esbuild: {
    include: /src\/.*\.js$/,
    exclude: [/node_modules/],
    loader: 'jsx',
    jsx: 'automatic',
  },
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 3000,
  },
  define: {
    'process.env.REACT_APP_USE_EMULATORS': JSON.stringify(process.env.REACT_APP_USE_EMULATORS || ''),
  },
}));
