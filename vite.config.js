import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  build: {
    // Keep the icon sprite as a separate file: <use href="data:...#id"> doesn't work
    assetsInlineLimit: (file) => (file.endsWith(".svg") ? false : undefined),
  },
  ssr: {
    noExternal: ["firebase"],
  },
});
