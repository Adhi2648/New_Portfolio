import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (!env.GEMINI_API_KEY && !env.VITE_GEMINI_API_KEY) {
    console.error("❌ CRITICAL ERROR: GEMINI_API_KEY is missing from your .env files. The app cannot start.");
    process.exit(1);
  }
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
