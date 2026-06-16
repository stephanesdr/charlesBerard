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

const defaultCsvPath = resolve(
  process.env.HOME || "",
  "Downloads/Projets Feuille 1.csv",
);
const csvPath = process.env.CSV_PATH
  ? resolve(process.env.CSV_PATH)
  : defaultCsvPath;

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
    const title = cells[colIndex.titre]?.trim() ?? "";
    const serviceRaw = cells[colIndex.service]?.trim() ?? "";
    const summary = cells[colIndex["résumé"] ?? colIndex.resume]?.trim() ?? "";
    const texte = cells[colIndex.texte]?.trim() ?? "";

    const services = serviceRaw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const slug = slugify(title);
    const isConcept =
      /n'a pas su voir le jour|n'a pas vu le jour|non réalisé/i.test(
        summary + texte,
      );

    return {
      _id: `project-${slug}`,
      _type: "project",
      title,
      slug: { _type: "slug", current: slug },
      services,
      summary,
      body: textToBlocks(texte),
      projectStatus: isConcept ? "concept" : "realized",
      order,
      orderRank: `0|${String(100000 + order * 4096).padStart(6, "0")}:`,
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
  sections: [
    {
      _type: "homeIntroSection",
      _key: "intro",
      label: "Intro",
      text:
        "Direction graphique, identité et conception pour des projets culturels, institutionnels et événementiels.",
    },
    {
      _type: "homeProjectIndexSection",
      _key: "projects",
      label: "Projets",
      columnLayout: "two",
      projectSource: "all",
      showSidebar: true,
      sidebarLink: {
        label: "Contact",
        href: "/contact",
        openInNewTab: false,
      },
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
    await client.createOrReplace(project);
    console.log("  ✓", project.title, `(${project.projectStatus})`);
  }

  console.log("Seed complete.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
