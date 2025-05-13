import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { PluginOptions } from "babel-plugin-react-compiler";

const ReactCompilerConfig: Partial<PluginOptions> = {
    // sources: (filename) => {
    //     return filename.indexOf("src/path/to/dir") !== -1;
    // },
};
export default defineConfig((config) => {
    // console.log(config);
    return {
        base: "",
        server: { https: { key: "./musjugvr.key", cert: "./musjugvr.crt" } },
        build: {
            target: "esnext",
            minify: false,
            assetsInlineLimit: 0
        },
        plugins: [
            react({
                babel: {
                    plugins: [
                        ["babel-plugin-react-compiler", ReactCompilerConfig] /*must run first!*/
                    ]
                }
            })
        ],
        resolve: {
            alias: {
                "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs"
            }
        }
    };
});