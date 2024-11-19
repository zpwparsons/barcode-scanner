import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig((config) => {
  return {
    // prevent vite from obscuring rust errors
    clearScreen: false,
    server: {
      // Tauri expects a fixed port, fail if that port is not available
      strictPort: true,
      // if the host Tauri is expecting is set, use it
      host: host || false,
      port: 5173,
    },
    envPrefix: ['VITE_', 'TAURI_ENV_*'],
    build: {
      // Tauri uses Chromium on Windows and WebKit on macOS and Linux
      target:
        process.env.TAURI_ENV_PLATFORM == 'windows'
          ? 'chrome105'
          : 'safari13',
      // don't minify for debug builds
      minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_ENV_DEBUG,
    },
    plugins: [
      vue()
    ],
    base: "./",
    define: {
      'process.env': {
        BUILD_ENV: config.mode,
        VUE_APP_PUBLIC_PATH: "./"
      },
    }
  }
})
