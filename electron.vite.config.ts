import react from "@vitejs/plugin-react";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import { resolve } from "path";

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        "~/renderer": resolve(__dirname, "src/renderer/src"),
        "~/assets": resolve(__dirname, "src/renderer/src/assets"),
        "~/components": resolve(__dirname, "src/renderer/src/components"),
        "~/lib": resolve(__dirname, "src/renderer/src/lib"),
      },
    },
    plugins: [react()],
  },
});
