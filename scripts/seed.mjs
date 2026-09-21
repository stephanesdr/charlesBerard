/**
 * Seed Sanity from Projets CSV + site singletons.
 *
 * Usage:
 *   node scripts/seed.mjs
 *   CSV_PATH=/path/to/file.csv node scripts/seed.mjs
 *
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
const token =
  process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN / SANITY_API_WRITE_TOKEN. Check .env.local",
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

const defaultCsvPath = resolve(root, "scripts/templates/projets-v2.csv");
const legacyCsvPath = resolve(
  process.env.HOME || "",
  "Downloads/Projets Feuille 1.csv",
);
const csvPath = process.env.CSV_PATH
  ? resolve(process.env.CSV_PATH)
  : existsSync(defaultCsvPath)
    ? defaultCsvPath
    : legacyCsvPath;

function slugify(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function textToBlocks(text) {
  return text
    .split(/\n\n+/)
    .filter(Boolean)
    .map((paragraph, i) => ({
      _type: "block",
      _key: `block-${i}`,
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: `span-${i}`,
          text: paragraph.replace(/\n/g, " ").trim(),
          marks: [],
        },
      ],
    }));
}

/** Minimal CSV parser (quoted fields, commas inside quotes). */
function parseCsv(content) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const next = content[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || (char === "\r" && next === "\n")) {
      row.push(field);
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      field = "";
      if (char === "\r") i++;
    } else if (char !== "\r") {
      field += char;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  return rows;
}

function cell(colIndex, cells, ...names) {
  for (const name of names) {
    const index = colIndex[name];
    if (index !== undefined && index !== null) {
      return (cells[index] ?? "").trim();
    }
  }
  return "";
}

function parseRowLayout(value) {
  const raw = value.trim().toLowerCase();
  if (raw === "2" || raw === "pair") return "pair";
  return "single";
}

function parseProjectsFromCsv(path) {
  if (!existsSync(path)) {
    throw new Error(`CSV not found: ${path}`);
  }

  const content = readFileSync(path, "utf8").replace(/^\uFEFF/, "");
  const rows = parseCsv(content);
  const [header, ...dataRows] = rows;

  const colIndex = Object.fromEntries(
    header.map((name, index) => [name.trim().toLowerCase(), index]),
  );

  return dataRows.map((cells, order) => {
    const title = cell(colIndex, cells, "titre", "title");
    const slugRaw = cell(colIndex, cells, "slug");
    const serviceRaw = cell(colIndex, cells, "services", "service");
    const summary = cell(colIndex, cells, "résumé", "resume");
    const texte = cell(colIndex, cells, "texte", "text");
    const category = cell(colIndex, cells, "catégorie", "categorie", "category");
    const client = cell(colIndex, cells, "client");
    const year = cell(colIndex, cells, "année", "annee", "year");
    const statut = cell(colIndex, cells, "statut", "status");
    const orderRaw = cell(colIndex, cells, "ordre", "order");

    const services = serviceRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = slugRaw || slugify(title);
    const isConcept =
      /axe/i.test(statut) ||
      /n'a pas su voir le jour|n'a pas vu le jour|non réalisé/i.test(
        summary + texte,
      );

    const homeRows = [1, 2]
      .map((n) => {
        const type = cell(colIndex, cells, `row${n}_type`);
        const caption = cell(
          colIndex,
          cells,
          `row${n}_legende`,
          `row${n}_caption`,
        );
        if (!type && !caption) return null;
        return {
          _type: "homeMediaRow",
          _key: `row${n}`,
          layout: parseRowLayout(type || "1"),
          caption: caption || undefined,
        };
      })
      .filter(Boolean);

    const parsedOrder = Number.parseInt(orderRaw, 10);
    const resolvedOrder = Number.isFinite(parsedOrder) ? parsedOrder : order;

    return {
      _id: `project-${slug}`,
      _type: "project",
      title,
      slug: { _type: "slug", current: slug },
      category: category || undefined,
      client: client || undefined,
      year: year || undefined,
      services,
      summary,
      body: textToBlocks(texte),
      homeRows,
      projectStatus: isConcept ? "concept" : "realized",
      order: resolvedOrder,
      orderRank: `0|${String(100000 + resolvedOrder * 4096).padStart(6, "0")}:`,
    };
  });
}

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteTitle: "Charles Berard",
  headerNavigation: [
    { label: "Projets", href: "/", variant: "primary", openInNewTab: false },
    {
      label: "À propos",
      href: "/a-propos",
      variant: "secondary",
      openInNewTab: false,
    },
    {
      label: "Contact",
      href: "/contact",
      variant: "secondary",
      openInNewTab: false,
    },
  ],
  footerText:
    "Charles Berard — direction graphique, identité et conception print.",
  footerLinks: [
    { label: "Projets", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Contact", href: "/contact" },
  ],
  seo: {
    title: "Charles Berard — Direction graphique",
    description:
      "Portfolio de Charles Berard, direction graphique et identité visuelle.",
  },
};

const home = {
  _id: "home",
  _type: "home",
  title: "Accueil",
  heroTitle: "Charles Bérard",
  marqueeText: "Charles Bérard, brand designer & creative director",
  sections: [
    {
      _type: "homeIntroSection",
      _key: "services",
      label: "Services",
      text:
        "Defining brand strategy. — Translating trends into tangible touchpoints and communication strategies. — Shaping multichannel brand experiences that engage, inspire and accelerate positive change through distinctive positioning. — Designing smart print and visual identities that consumers notice, desire and remember. — Telling brand stories. — Crafting websites. — Leading creative teams and facilitating co-creation.",
    },
    {
      _type: "homeManifestoSection",
      _key: "manifesto",
      label: "Manifeste",
      text: "Seeking meaning is our most reckless obsession. Yet form only achieves beauty when purpose gives it shape. Isn’t that beautiful?",
    },
    {
      _type: "homeProjectIndexSection",
      _key: "projects",
      label: "Projets",
      projects: [
        {
          _type: "reference",
          _ref: "project-fashion-show-massimo-dutti-ss25",
          _key: "p-massimo",
        },
        {
          _type: "reference",
          _ref: "project-federal-innovation-award",
          _key: "p-federal",
        },
        {
          _type: "reference",
          _ref: "project-les-tailleurs",
          _key: "p-tailleurs",
        },
        {
          _type: "reference",
          _ref: "project-brussels-food-campus",
          _key: "p-bfc",
        },
      ],
      rows: [
        {
          _type: "homeProjectRow",
          _key: "row-1",
          layout: "single",
          projects: [
            {
              _type: "reference",
              _ref: "project-fashion-show-massimo-dutti-ss25",
              _key: "row-1-p1",
            },
          ],
        },
        {
          _type: "homeProjectRow",
          _key: "row-2",
          layout: "pair",
          projects: [
            {
              _type: "reference",
              _ref: "project-federal-innovation-award",
              _key: "row-2-p1",
            },
            {
              _type: "reference",
              _ref: "project-les-tailleurs",
              _key: "row-2-p2",
            },
          ],
        },
        {
          _type: "homeProjectRow",
          _key: "row-3",
          layout: "single",
          projects: [
            {
              _type: "reference",
              _ref: "project-brussels-food-campus",
              _key: "row-3-p1",
            },
          ],
        },
      ],
    },
  ],
  seo: {
    title: "Charles Berard — Direction graphique",
    description: "Portfolio de projets sélectionnés.",
  },
};

const aboutPage = {
  _id: "page-a-propos",
  _type: "page",
  title: "À propos",
  slug: { _type: "slug", current: "a-propos" },
  intro:
    "Direction graphique indépendante, entre papier, identité et mise en scène.",
  body: textToBlocks(
    "Charles Berard accompagne des institutions, des maisons de mode et des festivals dans la conception d'identités visuelles et de systèmes graphiques complets.\nDu naming à la scénographie, du print au digital, chaque projet est pensé pour durer et pour tenir en grand format autant qu'en détail.\nCe portfolio présente une sélection de travaux réalisés et d'axes de recherche graphique — des projets menés jusqu'au bout, et d'autres qui restent des explorations abouties.",
  ),
  seo: {
    title: "À propos — Charles Berard",
    description: "Direction graphique et identité visuelle.",
  },
};

const contactPage = {
  _id: "page-contact",
  _type: "page",
  title: "Contact",
  slug: { _type: "slug", current: "contact" },
  intro: "Pour un projet, une collaboration ou une question.",
  body: textToBlocks(
    "Email : contact@charlesberard.eu\nBruxelles, Belgique\n\nDisponible pour des missions en direction graphique, identité, papeterie et scénographie événementielle.",
  ),
  seo: {
    title: "Contact — Charles Berard",
    description: "Contactez Charles Berard pour vos projets graphiques.",
  },
};

async function seed() {
  console.log("Sanity project:", projectId, "dataset:", dataset);
  console.log("CSV:", csvPath);

  const projects = parseProjectsFromCsv(csvPath);
  console.log("Projects from CSV:", projects.length);

  await client.createOrReplace(siteSettings);
  await client.createOrReplace(home);
  await client.createOrReplace(aboutPage);
  await client.createOrReplace(contactPage);

  for (const project of projects) {
    const existing = await client.getDocument(project._id).catch(() => null);
    await client.createOrReplace({
      ...project,
      coverImage: existing?.coverImage,
      gallery: existing?.gallery,
      homeRows:
        project.homeRows?.length ? project.homeRows : existing?.homeRows,
    });
    console.log("  ✓", project.title, `(${project.projectStatus})`);
  }

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
