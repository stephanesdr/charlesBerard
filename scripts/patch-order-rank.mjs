/**
 * Set orderRank on project documents that have null/missing orderRank.
 *
 * Usage: node scripts/patch-order-rank.mjs
 * Requires NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN (.env.local).
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(resolve(root, ".env.local"));
loadEnvFile(resolve(root, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN. Check .env.local",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function orderRankForIndex(index) {
  return `0|${String(100000 + index * 4096).padStart(6, "0")}:`;
}

async function patch() {
  const projects = await client.fetch(
  `*[_type == "project"] | order(order asc, _createdAt asc) { _id, title, orderRank, order }`,
  );

  const needsPatch = projects.filter(
    (doc) => typeof doc.orderRank !== "string" || !doc.orderRank,
  );

  if (needsPatch.length === 0) {
    console.log("All projects already have orderRank.");
    return;
  }

  console.log(`Patching orderRank on ${needsPatch.length} project(s)...`);

  let transaction = client.transaction();
  let batch = 0;

  for (let i = 0; i < projects.length; i++) {
    const doc = projects[i];
    if (typeof doc.orderRank === "string" && doc.orderRank) continue;

    transaction = transaction.patch(doc._id, {
      set: { orderRank: orderRankForIndex(i) },
    });
    batch++;
    console.log(`  → ${doc.title}: ${orderRankForIndex(i)}`);

    if (batch >= 50) {
      await transaction.commit();
      transaction = client.transaction();
      batch = 0;
    }
  }

  if (batch > 0) await transaction.commit();

  console.log("Patch complete.");
}

patch().catch((err) => {
  console.error(err);
  process.exit(1);
});
