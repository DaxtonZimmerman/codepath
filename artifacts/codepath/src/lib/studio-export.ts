import { zipSync, strToU8 } from "fflate";
import { downloadFile } from "./store";
import { type StudioProject } from "./studio-model";

export function projectZip(p: StudioProject) {
  const readme = `# ${p.title}\n\n${p.description}\n\n## Run\nUnzip all files into one folder and open index.html in a browser. Keep styles.css and script.js beside it. No install, account, or build step is required.\n\n## Publish manually with Replit\n1. Open https://replit.com/import and choose ZIP import, or import a GitHub repository containing these files.\n2. Check that index.html is served as the entry page and preview your app.\n3. Open Publishing, review the available deployment type and costs, and publish only when you choose.\n4. Paste the live URL and repository URL back into Codepath.\nCurrent import help: https://docs.replit.com/build/import-from-providers\nPublishing help: https://docs.replit.com/category/replit-deployments\n\n## Notes\n${p.notes}\n\n## Reflection\nWhat I built: ${p.reflection[0]}\nWhat was difficult and how I solved it: ${p.reflection[1]}\nWhat I would improve next: ${p.reflection[2]}\n\nExported code runs in your browser normally, outside Codepath's restricted preview. Review code before hosting. Never put secrets in browser files.\n`;
  return zipSync({ ...Object.fromEntries(Object.entries(p.files).map(([name, text]) => [name, strToU8(text)])), "README.md": strToU8(readme) });
}
export function exportProject(p: StudioProject) {
  const bytes = projectZip(p);
  downloadFile(`${p.title.replace(/[^a-z0-9_-]+/gi, "-") || "project"}.zip`, new Blob([new Uint8Array(bytes)], { type: "application/zip" }));
}
