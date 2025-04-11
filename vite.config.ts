import { defineConfig } from "vite";

export default defineConfig({
    base: "",
    build: {
        target: "esnext",
        minify: false,
        assetsInlineLimit: 0
    }
});
