import { expect, test } from "@playwright/test";
import { mkdirSync } from "node:fs";
import { resolve } from "node:path";

const REFERENCE_URL = "https://maisonauge.com/";
const assetsDir = resolve(process.cwd(), "docs/assets");

test.describe("maisonauge reference baseline", { tag: "@reference" }, () => {
  test("extracts sticky project index structure", async ({ page }, testInfo) => {
    test.setTimeout(60_000);
    await page.goto(REFERENCE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(testInfo.project.name === "mobile" ? 6000 : 2500);
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(800);

    mkdirSync(assetsDir, { recursive: true });
    const shotName =
      testInfo.project.name === "mobile"
        ? "maisonauge-mobile.png"
        : "maisonauge-desktop.png";
    await page.screenshot({
      path: resolve(assetsDir, shotName),
      fullPage: false,
    });

    const analysis = await page.evaluate(() => {
      const main = document.querySelector("main");
      const htmlOverflow = getComputedStyle(document.documentElement).overflow;
      const bodyOverflow = getComputedStyle(document.body).overflow;
      const children = main
        ? Array.from(main.children).map((el) => ({
            tag: el.tagName.toLowerCase(),
            className: (el.getAttribute("class") || "").slice(0, 180),
          }))
        : [];

      const sticky = Array.from(
        document.querySelectorAll("main *"),
      ).filter((el) => getComputedStyle(el).position === "sticky");

      const blocks = sticky
        .map((el) => el.parentElement)
        .filter((el, index, list) => el && list.indexOf(el) === index);

      const rowStats = blocks.slice(0, 8).map((block) => {
        const media = Array.from(
          block?.querySelectorAll("img, video") ?? [],
        ).filter((node) => {
          const rect = node.getBoundingClientRect();
          return rect.width > 40 && rect.height > 40;
        });
        return { media: media.length };
      });

      return {
        childCount: children.length,
        children,
        stickyCount: sticky.length,
        blockCount: blocks.length,
        rowStats,
        htmlOverflow,
        bodyOverflow,
        hasMarquee: Boolean(
          document.querySelector("[class*='mix-blend'], [class*='marquee']"),
        ),
      };
    });

    expect(analysis.childCount).toBeGreaterThanOrEqual(3);
    if (testInfo.project.name === "mobile") {
      expect(analysis.children.length).toBeGreaterThan(0);
    } else {
      expect(analysis.blockCount).toBeGreaterThanOrEqual(4);
      expect(analysis.stickyCount).toBeGreaterThanOrEqual(4);
    }
    expect(analysis.hasMarquee).toBeTruthy();
  });
});
