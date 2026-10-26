import { build } from "esbuild";
import { fileURLToPath } from "node:url";
await build({
  entryPoints: [fileURLToPath(new URL("./src/studio/worker.ts", import.meta.url))],
  outfile: fileURLToPath(new URL("./public/runtime/studio-worker.js", import.meta.url)),
  bundle: true, platform: "browser", format: "iife", target: "es2022", minify: true,
});
