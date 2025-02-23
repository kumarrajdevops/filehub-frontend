import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // Load environment variables
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/filehub-frontend/",
    define: {
      "import.meta.env": env, // Ensure Vite picks up env variables
    },
    server: {
      hmr: {
        overlay: false, // 🔹 Disables Vite's WebSocket overlay errors
      },
    },
  };
});
