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
    await header.scrollIntoViewIfNeeded();
    const blockBox = await blocks.first().boundingBox();
    expect(blockBox).toBeTruthy();
    await page.evaluate((offset) => {
      window.scrollBy(0, offset);
    }, Math.round((blockBox?.height ?? 900) * 0.4));
    await page.waitForTimeout(400);

    const stickyTop = await header.evaluate(
      (el) => el.getBoundingClientRect().top,
    );
    expect(stickyTop).toBeLessThan(8);
  });
});
