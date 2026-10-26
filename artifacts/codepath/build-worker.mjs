import { build } from "esbuild";
await build({
  entryPoints: [new URL("./src/studio/worker.ts", import.meta.url).pathname],
  outfile: new URL("./public/runtime/studio-worker.js", import.meta.url).pathname,
  bundle: true, platform: "browser", format: "iife", target: "es2022", minify: true,
});
