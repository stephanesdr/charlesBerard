/**
 * Push Sanity env vars from .env.local to linked Vercel project.
 * Usage: node scripts/sync-vercel-env.mjs
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(path) {
  const env = {};
  if (!existsSync(path)) return env;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const local = {
  ...loadEnvFile(resolve(root, ".env")),
  ...loadEnvFile(resolve(root, ".env.local")),
};

const ENVS = [
  { target: "production" },
  { target: "development" },
];

const vars = [
  { key: "NEXT_PUBLIC_SANITY_PROJECT_ID", sensitive: false },
  { key: "NEXT_PUBLIC_SANITY_DATASET", sensitive: false },
  { key: "NEXT_PUBLIC_SANITY_API_VERSION", sensitive: false },
  { key: "NEXT_PUBLIC_SITE_URL", sensitive: false, fallback: "https://charles-berard.vercel.app" },
  { key: "SANITY_API_READ_TOKEN", sensitive: true },
  { key: "SANITY_API_TOKEN", sensitive: true },
  { key: "SANITY_API_WRITE_TOKEN", sensitive: true, aliasOf: "SANITY_API_TOKEN" },
];

console.log("Syncing env to Vercel (stadler-design/charles-berard)…");

for (const def of vars) {
  const value =
    def.aliasOf ? local[def.aliasOf] : local[def.key] ?? def.fallback;
  if (!value) {
    console.warn(`  skip ${def.key} — no value in .env.local`);
    continue;
  }
  const targets =
    def.sensitive
      ? [{ target: "production" }]
      : ENVS;
  for (const { target, gitBranch } of targets) {
    const args = [
      "vercel",
      "env",
      "add",
      def.key,
      target,
      ...(gitBranch ? [gitBranch] : []),
      "--yes",
      "--force",
      "--value",
      value,
    ];
    if (def.sensitive) args.push("--sensitive");
    else if (target === "development") args.push("--no-sensitive");

    const label = gitBranch ? `${target}/${gitBranch}` : target;

    try {
      execFileSync("npx", args, { cwd: root, stdio: "pipe" });
      console.log(`  ✓ ${def.key} → ${label}`);
    } catch (err) {
      const msg = err.stderr?.toString() || err.message || "";
      if (/already exists|duplicate/i.test(msg)) {
        console.log(`  · ${def.key} (${label}) already exists`);
      } else {
        console.error(`  ✗ ${def.key} (${label}):`, msg.trim().split("\n").pop());
      }
    }
  }
}

console.log("Done. Run: npx vercel env ls");
