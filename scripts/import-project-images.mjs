/**
 * Normalize project photos and attach them to Sanity.
 *
 *   node scripts/import-project-images.mjs --dry-run
 *   node scripts/import-project-images.mjs
 *
 * PHOTOS_DIR defaults to ~/Downloads/projets.
 * Existing project copy is kept. New slugs get provisional French text + SEO.
 */
import { createClient } from "@sanity/client";
import { createHash, randomBytes } from "node:crypto";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const dryRun = process.argv.includes("--dry-run");

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    if (!process.env[key]) process.env[key] = trimmed.slice(eq + 1).trim();
  }
}

loadEnvFile(resolve(root, ".env.local"));
loadEnvFile(resolve(root, ".env"));

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const photosDir = resolve(
  process.env.PHOTOS_DIR || join(homedir(), "Downloads/projets"),
);

if (!dryRun && (!projectId || !token)) {
  console.error("Missing Sanity project id or write token.");
  process.exit(1);
}

const client = dryRun
  ? null
  : createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false,
    });

const KNOWN_SLUGS = new Set([
  "fashion-show-massimo-dutti-ss25",
  "federal-innovation-award",
  "les-tailleurs",
  "brussels-food-campus",
]);

const LANDSCAPE_RATIO = 1.2;

function key() {
  return randomBytes(6).toString("hex");
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

function orderRank(index) {
  return `0|${String(100000 + index * 4096).padStart(6, "0")}:`;
}

/** Provisional copy, volume aligned with the two written projects. */
const PROVISIONAL = {
  batibouw: {
    title: "Batibouw",
    category: "Identité — Print",
    services: ["Identité", "logotype", "déclinaisons"],
    summary:
      "Texte provisoire — à remplacer. Une identité construite autour d'une tortue dont la carapace est un mur de briques : le salon Batibouw, la construction, la lenteur utile. Le signe tient en une couleur, un aplat rouge, un blanc qui découpe. Le travail porte sur le logotype, sa lisibilité à distance et ses déclinaisons print.",
    body: `Texte provisoire — à remplacer. Batibouw est le grand rendez-vous belge de la construction. Le signe devait se lire de loin, sur un stand comme sur une affiche, sans mode d'emploi.

Le dessin part d'une tortue. La carapace n'est pas un motif animalier plaqué : c'est un appareil de briques. Le corps, les pattes et la tête restent en aplat, pour que le mur reste l'information principale.

Le rouge est plein, sans dégradé. Le blanc fait le reste. Cette économie permet de tenir en très grand comme en tout petit, sur un badge, un roll-up ou une page de catalogue.

La suite du dossier montre le signe posé dans des mises en situation et des objets imprimés. Le texte définitif viendra préciser le brief, le commanditaire et le périmètre exact de la mission.`,
  },
  "griffe-magazine": {
    title: "Griffe",
    category: "Édition — Magazine",
    services: ["Direction artistique", "édition", "couverture"],
    summary:
      "Texte provisoire — à remplacer. Griffe est un objet éditorial : couverture jaune, titre en réserve, étiquette cousue « Replica » pour un numéro autour de Maison Margiela. Le travail visible porte sur la couverture, la matière du papier et la manière dont un magazine peut citer la mode sans l'illustrer platement.",
    body: `Texte provisoire — à remplacer. Griffe se présente comme un magazine, pas comme une brochure. Le numéro montré ici tourne autour de Maison Margiela : la mode racontée par ses étiquettes, la réplique, la pièce qui se souvient d'une autre.

La couverture est un aplat jaune, presque textile. Le nom de la maison est en blanc, large, posé bas. Une étiquette cousue vient par-dessus, avec le mot Replica et les lignes d'un vêtement reproduit. Le fil n'est pas un effet : il fait partie de l'objet.

Le format, le papier et la lumière de la prise de vue comptent autant que le dessin. On voit un volume, une tranche, une couture. L'édition est pensée pour être tenue.

Les pages intérieures et les autres couvertures du dossier restent à documenter. Ce texte fixe seulement ce que les images permettent déjà de dire.`,
  },
  "hotel-casarose": {
    title: "Hôtel Casarose",
    category: "Identité — Hospitalité",
    services: ["Identité", "baseline", "signalétique"],
    summary:
      "Texte provisoire — à remplacer. Hôtel Casarose, « dream in color ». Le nom est découpé en blocs de couleur posés sur une photographie de piscine, parasols jaunes, transat rayé. L'identité emprunte la lumière du lieu plutôt que de la recouvrir : une hospitalité du sud, lisible en une ligne.",
    body: `Texte provisoire — à remplacer. Casarose est un hôtel. Les images le montrent dehors : piscine, parasols à festons, fauteuil rayé, végétation dense. La couleur est déjà dans le lieu. Le travail graphique consiste à ne pas en ajouter une autre par-dessus.

Le logotype est une suite de rectangles — rose, ocre, bleu, rouge, jaune — chacun portant une lettre. « Hôtel » reste en script, au-dessus. La baseline, « dream in color », est manuscrite, volontairement plus petite.

Le système doit pouvoir vivre sur une photo forte sans la masquer, et aussi sur un papier à en-tête où la photo n'est plus là. Les aplats de couleur sont là pour ça.

Le dossier image montre le signe dans son décor et, plus loin, des déclinaisons. Le récit client, les dates et le périmètre restent à écrire.`,
  },
  respace: {
    title: "(re)space",
    category: "Identité — Typographie",
    services: ["Naming", "logotype", "direction graphique"],
    summary:
      "Texte provisoire — à remplacer. (re)space tient dans un mot : les parenthèses autour de « re », le reste en romain noir sur fond clair. Le signe parle de remise en espace, de seconde vie d'un lieu ou d'une marque. Peu d'éléments, beaucoup de blanc, une typographie qui doit porter seule.",
    body: `Texte provisoire — à remplacer. (re)space n'a pas d'illustration. Le nom fait le travail. « re » est entre parenthèses, comme une précision ou un recommencement. « space » suit, dans le même corps, sans changer de graisse.

Le fond est presque blanc. Aucun à-plat coloré, aucun pictogramme. C'est un parti pris : si le mot ne tient pas seul, le reste ne le sauvera pas.

Les images du dossier déclinent ce signe — mises en page, peut-être un lieu, peut-être des supports. On y lit une direction graphique minimale, pensée pour durer au-delà d'une saison.

Le texte définitif devra dire ce que (re)space recouvre vraiment : un lieu, une marque, une refonte. Les photos ne le disent pas encore assez pour l'inventer.`,
  },
  "ruinart-brafa": {
    title: "Ruinart — Brafa",
    category: "Scénographie — Édition",
    services: ["Scénographie", "signalétique", "édition"],
    summary:
      "Texte provisoire — à remplacer. Un mur blanc, le mot Ruinart éclairé, la ligne « conversations with nature », un néon doré qui descend comme une tige, un écran et un cartel. La scène est celle d'une foire — Brafa — où la maison de champagne dialogue avec une œuvre. Le graphisme est dans l'espace, pas seulement sur le papier.",
    body: `Texte provisoire — à remplacer. Ruinart à Brafa. Le stand, ou le mur, est blanc. Le nom est en lettres lumineuses, haut, dans une typographie à empattements. Dessous : « conversations with nature ».

Un tube doré traverse le mur de haut en bas, irrégulier, plus proche d'une branche que d'un néon de vitrine. À droite, un écran montre la bouteille, Blanc de Blancs. À gauche, un cartel imprimé porte le texte de l'exposition.

Le travail visible mêle signalétique, lumière et édition courte. Rien n'est criard : le luxe est dans le vide autour des mots.

Les autres vues du dossier précisent les objets et les détails. Le texte final nommera les collaborateurs, l'artiste cité sur le cartel et ce qui relevait exactement de la direction graphique.`,
  },
  "setip-gcube": {
    title: "Setip",
    category: "Identité — Territoire",
    services: ["Identité", "logotype", "photographie"],
    summary:
      "Texte provisoire — à remplacer. Un chantier vu du dessus, ocres et engins jaunes, et par-dessus un monogramme blanc en barres épaisses. Setip pose son signe sur le territoire qu'il transforme. L'identité est géométrique, lisible en très grand, pensée pour un acteur du sol et du bâtiment.",
    body: `Texte provisoire — à remplacer. La photographie est un terrassement : pelles, pistes, terres rouges et grises. Le logotype vient en blanc, au centre, en barres horizontales qui dessinent un monogramme. Il ne décrit pas le chantier. Il s'y pose.

Le signe est simple assez pour être peint, gravé ou imprimé en une couleur. Les barres ont la même logique qu'une signalétique de site : vues de loin, elles restent un dessin, pas une phrase.

Le dossier alterne ce type de vue large et des images plus resserrées. On y devine une identité d'entreprise liée au territoire, pas une marque de produit.

Le nom exact du commanditaire, le développement du monogramme et les règles d'usage restent à rédiger. Ce texte ne fait que tenir la place, au volume d'une fiche projet déjà écrite.`,
  },
};

function imageRef(assetId, alt) {
  return {
    _type: "image",
    _key: key(),
    alt,
    asset: { _type: "reference", _ref: assetId },
  };
}

async function readSlots(dir) {
  const names = readdirSync(dir).filter(
    (name) => !name.startsWith(".") && /\.(png|jpe?g|webp|tif)$/i.test(name),
  );
  const measured = [];
  for (const name of names) {
    const path = join(dir, name);
    const meta = await sharp(path).metadata();
    const width = meta.width ?? 1;
    const height = meta.height ?? 1;
    measured.push({
      name,
      path,
      letter: basename(name, extname(name)),
      ratio: width / height,
    });
  }

  const cover = measured.find((file) => file.letter === "cover") ?? null;
  const groups = new Map();
  for (const file of measured) {
    const match = file.letter.match(/^row(\d+)-([a-z][a-z0-9-]*)$/);
    if (!match) continue;
    const bucket = groups.get(match[1]) ?? [];
    bucket.push({ ...file, letter: match[2] });
    groups.set(match[1], bucket);
  }

  const rows = [];
  for (const rowIndex of [...groups.keys()].sort((a, b) => Number(a) - Number(b))) {
    const portraits = [];
    const sorted = groups.get(rowIndex).sort((a, b) => a.letter.localeCompare(b.letter));
    for (const file of sorted) {
      if (file.ratio >= LANDSCAPE_RATIO) {
        rows.push({ layout: "single", files: [file] });
        continue;
      }
      portraits.push(file);
      if (portraits.length === 2) {
        rows.push({ layout: "pair", files: portraits.splice(0, 2) });
      }
    }
    if (portraits.length === 1) {
      rows.push({ layout: "single", files: portraits.splice(0, 1) });
    }
  }

  return { cover, rows };
}

async function toJpeg(path) {
  return sharp(path)
    .rotate()
    .toColorspace("srgb")
    .resize({
      width: 2400,
      height: 2400,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toBuffer();
}

async function uploadJpeg(buffer, filename) {
  const sha1 = createHash("sha1").update(buffer).digest("hex");
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && originalFilename == $filename] | order(_updatedAt desc)[0]{ _id, sha1 }`,
    { filename },
  );
  if (existing?.sha1 === sha1) {
    return { _id: existing._id, reused: true };
  }
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _id: asset._id, reused: false };
}

async function main() {
  if (!existsSync(photosDir)) {
    console.error("Photos folder not found:", photosDir);
    process.exit(1);
  }

  const slugs = readdirSync(photosDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith("."))
    .map((entry) => entry.name)
    .sort();

  console.log(dryRun ? "DRY RUN" : "IMPORT", photosDir);
  const imported = [];
  let newOrder = 4;

  for (const slug of slugs) {
    const slots = await readSlots(join(photosDir, slug));
    const rowSummary = slots.rows
      .map((row) => `${row.layout}(${row.files.map((file) => file.letter).join("+")})`)
      .join(" ");
    console.log(
      `\n${slug}  cover=${slots.cover ? "yes" : "NO"}  ${rowSummary || "no rows"}`,
    );
    if (!slots.cover) {
      console.log("  skip: missing cover");
      continue;
    }

    if (dryRun) {
      imported.push(slug);
      continue;
    }

    const titleHint = PROVISIONAL[slug]?.title ?? slug;
    const coverName = `${slug}--cover.jpg`;
    const coverAsset = await uploadJpeg(await toJpeg(slots.cover.path), coverName);
    console.log(`  ${coverAsset.reused ? "reuse" : "upload"} ${coverName}`);

    const homeRows = [];
    const gallery = [];
    for (const [index, row] of slots.rows.entries()) {
      const media = [];
      for (const file of row.files) {
        const filename = `${slug}--row${index + 1}-${file.letter}.jpg`;
        const asset = await uploadJpeg(await toJpeg(file.path), filename);
        console.log(`  ${asset.reused ? "reuse" : "upload"} ${filename}`);
        const image = imageRef(asset._id, `${titleHint} — ${file.letter}`);
        media.push(image);
        gallery.push({ ...image, _key: key() });
      }
      homeRows.push({
        _type: "homeMediaRow",
        _key: `row-${index + 1}`,
        layout: row.layout,
        media,
      });
    }

    const id = `project-${slug}`;
    const existing = await client.getDocument(id).catch(() => null);
    const coverImage = imageRef(coverAsset._id, titleHint);
    delete coverImage._key;

    if (existing && KNOWN_SLUGS.has(slug)) {
      const previous = existing.homeRows ?? [];
      const withCaptions = homeRows.map((row, index) => ({
        ...row,
        caption: previous[index]?.caption,
      }));
      const patch = {
        coverImage,
        homeRows: withCaptions,
        gallery,
      };
      if (!existing.seo?.title || !existing.seo?.description) {
        const description = (existing.summary || existing.title || titleHint).slice(0, 160);
        patch.seo = {
          title: `${existing.title || titleHint} — Charles Berard`,
          description,
          ogImage: coverImage,
        };
      }
      await client.patch(id).set(patch).commit();
      console.log("  patched (text kept)");
    } else if (existing) {
      await client.patch(id).set({ coverImage, homeRows, gallery }).commit();
      console.log("  patched images");
    } else {
      const copy = PROVISIONAL[slug];
      if (!copy) {
        console.log("  skip create: no provisional copy");
        continue;
      }
      const description = copy.summary.replace(/^Texte provisoire — à remplacer\. /, "").slice(0, 160);
      await client.createOrReplace({
        _id: id,
        _type: "project",
        title: copy.title,
        slug: { _type: "slug", current: slug },
        category: copy.category,
        services: copy.services,
        summary: copy.summary,
        body: textToBlocks(copy.body),
        projectStatus: "realized",
        order: newOrder,
        orderRank: orderRank(newOrder),
        coverImage,
        homeRows,
        gallery,
        seo: {
          title: `${copy.title} — Charles Berard`,
          description,
          ogImage: coverImage,
        },
      });
      console.log("  created");
      newOrder += 1;
    }
    imported.push(slug);
  }

  if (dryRun) {
    console.log("\nWould touch:", imported.join(", "));
    return;
  }

  const home = await client.fetch(`*[_id == "home"][0]{ sections }`);
  if (!home?.sections) {
    console.log("\nNo home document, skip index.");
    return;
  }

  const sections = home.sections.map((section) => {
    if (section._type !== "homeProjectIndexSection") return section;
    const projects = [...(section.projects ?? [])];
    const present = new Set(projects.map((item) => item._ref));
    for (const slug of imported) {
      const ref = `project-${slug}`;
      if (present.has(ref)) continue;
      if (KNOWN_SLUGS.has(slug)) continue;
      projects.push({ _type: "reference", _ref: ref, _key: key() });
      present.add(ref);
    }
    return { ...section, projects };
  });

  await client.patch("home").set({ sections }).commit();
  console.log("\nHome index updated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
