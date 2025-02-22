import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/filehub-frontend/",
  server: {
    hmr: {
      overlay: false, // 🔹 Disables Vite's WebSocket overlay errors
    },
  },
});
