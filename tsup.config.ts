import { defineConfig } from "tsup";

const isDev = process.env.npm_lifecycle_event === "dev";

export default defineConfig({
    clean: true,
    dts: true,
    entry: ["src/index.ts"],
    format: ["esm"],
    minify: false,
    metafile: !isDev,
    sourcemap: true,
    target: "es2022",
    outDir: "dist",
    splitting: false,
    keepNames: true,
    bundle: true
});