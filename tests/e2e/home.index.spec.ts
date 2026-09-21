import { expect, test } from "@playwright/test";

test.describe("home project index", () => {
  test("sticky header, row layouts and project links", async ({
    page,
  }, testInfo) => {
    await page.goto("/");

    const blocks = page.locator("[data-project-block]");
    await expect(blocks.first()).toBeVisible();
    const count = await blocks.count();
    expect(count).toBeGreaterThanOrEqual(4);

    const singles = page.locator("[data-media-row='single']");
    const pairs = page.locator("[data-media-row='pair']");
    await expect(singles.first()).toBeVisible();
    await expect(pairs.first()).toBeVisible();

    await expect(pairs.first().locator(".relative.overflow-hidden")).toHaveCount(
      2,
    );
    await expect(
      singles.first().locator(".relative.overflow-hidden"),
    ).toHaveCount(1);

    await expect(
      page.locator("a[href^='/projets/'][aria-label^='Voir le projet']").first(),
    ).toBeVisible();

    if (testInfo.project.name === "mobile") {
      const display = await blocks
        .first()
        .evaluate((el) => getComputedStyle(el).flexDirection);
      expect(display).toBe("column");
      return;
    }

    const header = blocks.first().locator("[data-project-header]");
    await expect(header).toHaveCSS("position", "sticky");

    const overflow = await page.evaluate(() => ({
      html: getComputedStyle(document.documentElement).overflow,
      body: getComputedStyle(document.body).overflow,
    }));
    expect(overflow.html).toBe("visible");
    expect(overflow.body).toBe("visible");

    const measure = await blocks.first().evaluate(async (block) => {
      const top = block.getBoundingClientRect().top + window.scrollY;
      const height = block.getBoundingClientRect().height;
      window.scrollTo(0, Math.round(top + height * 0.45));
      await new Promise((resolve) => setTimeout(resolve, 600));
      const header = block.querySelector("[data-project-header]");
      return {
        blockTop: block.getBoundingClientRect().top,
        headerTop: header?.getBoundingClientRect().top ?? NaN,
      };
    });

    expect(measure.blockTop).toBeLessThan(-100);
    expect(measure.headerTop).toBeGreaterThanOrEqual(-1);
    expect(measure.headerTop).toBeLessThanOrEqual(8);
  });
});
