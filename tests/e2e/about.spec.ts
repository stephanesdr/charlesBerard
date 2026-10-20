import { expect, test } from "@playwright/test";

test.describe("About page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/about");
  });

  test("renders the structured content, active navigation and dedicated footer", async ({
    page,
  }) => {
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("CHARLES");
    await expect(page.locator("h1")).toContainText("BéRARD");

    const sectionTitles = await page
      .locator("[data-about-section] > h2")
      .allTextContents();
    expect(sectionTitles).toEqual([
      "Bringing experiences to life through image.",
      "Skills",
      "Career",
    ]);

    await expect(page.getByRole("link", { name: "ABOUT" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.getByRole("link", { name: "HOME" })).not.toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(page.locator("[data-about-footer]")).toHaveCount(1);
    await expect(page.locator("footer")).toHaveCount(1);
    await expect(
      page.getByRole("link", { name: "kisskiss@charlesberard.com" }),
    ).toHaveAttribute("href", "mailto:kisskiss@charlesberard.com");
    await expect(page.locator('a[href*="codepen.io"]')).toHaveCount(0);
    expect(await page.locator("body").textContent()).not.toContain("ByaNGod");
  });

  test("matches the desktop editorial grid and Figma hero geometry", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.setViewportSize({ width: 1512, height: 1000 });

    const geometry = await page.evaluate(() => {
      const editorial = document.querySelector<HTMLElement>(
        "[data-about-editorial]",
      );
      const section = document.querySelector<HTMLElement>(
        '[data-about-section="approach"]',
      );
      const title = section?.querySelector<HTMLElement>("h2");
      const body = section?.querySelector<HTMLElement>("div");
      const heroLines = Array.from(
        document.querySelectorAll<HTMLElement>("h1 > span"),
      );
      if (!editorial || !section || !title || !body) return null;

      return {
        editorial: editorial.getBoundingClientRect().toJSON(),
        section: section.getBoundingClientRect().toJSON(),
        title: title.getBoundingClientRect().toJSON(),
        body: body.getBoundingClientRect().toJSON(),
        heroLines: heroLines.map((line) =>
          line.getBoundingClientRect().toJSON(),
        ),
      };
    });

    expect(geometry).not.toBeNull();
    expect(geometry!.editorial.x).toBeCloseTo(80, 0);
    expect(geometry!.editorial.y).toBeCloseTo(799, 0);
    expect(geometry!.editorial.width).toBeCloseTo(1352, 0);
    expect(geometry!.title.width).toBeCloseTo(482, 0);
    expect(geometry!.body.width).toBeCloseTo(656, 0);
    expect(geometry!.body.x - geometry!.title.right).toBeCloseTo(214, 0);
    expect(geometry!.heroLines[0].x).toBeCloseTo(428, 0);
    expect(Math.abs(geometry!.heroLines[0].y - 357)).toBeLessThan(2);
    expect(geometry!.heroLines[1].x).toBeCloseTo(516, 0);
    expect(Math.abs(geometry!.heroLines[1].y - 465)).toBeLessThan(6);
  });

  test("stacks the editorial grid on mobile", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "mobile");
    const positions = await page
      .locator('[data-about-section="approach"]')
      .evaluate((section) => {
        const title = section.querySelector("h2")!.getBoundingClientRect();
        const body = section.querySelector("div")!.getBoundingClientRect();
        return {
          columns: getComputedStyle(section).gridTemplateColumns,
          titleBottom: title.bottom,
          bodyTop: body.top,
          titleWidth: title.width,
          bodyWidth: body.width,
        };
      });

    expect(positions.columns.split(" ")).toHaveLength(1);
    expect(positions.bodyTop).toBeGreaterThan(positions.titleBottom);
    expect(Math.abs(positions.titleWidth - positions.bodyWidth)).toBeLessThan(
      1,
    );
  });

  test("uses the semantic HTML fallback for reduced motion", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();

    await expect(page.locator("[data-about-shader]")).toHaveCount(0);
    await expect(page.locator("[data-about-hero]")).toHaveAttribute(
      "data-shader-ready",
      "false",
    );
    await expect(page.locator("h1")).toHaveCSS("opacity", "1");
  });

  test("initializes WebGL when available and cleans up on navigation", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop");
    const webglAvailable = await page.evaluate(() => {
      const canvas = document.createElement("canvas");
      return Boolean(
        canvas.getContext("webgl2") || canvas.getContext("webgl"),
      );
    });

    if (webglAvailable) {
      await expect(page.locator("[data-about-hero]")).toHaveAttribute(
        "data-shader-ready",
        "true",
      );
      await expect(page.locator("[data-about-shader]")).toHaveCount(1);
    }

    await page.getByRole("link", { name: "HOME" }).click();
    await expect(page).toHaveURL("/");
    await expect(page.locator("[data-about-shader]")).toHaveCount(0);
    await page.getByRole("link", { name: "ABOUT" }).click();
    await expect(page).toHaveURL("/about");
    await expect(page.locator("h1")).toHaveCount(1);
  });
});
