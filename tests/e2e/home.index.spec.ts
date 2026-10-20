import { expect, test } from "@playwright/test";

test.describe("home project index", () => {
  test("sticky header, row layouts and disabled project links", async ({
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

    await expect(page.locator("[data-project-link]")).toHaveCount(0);
    await expect(page.locator("[data-project-cover]")).toHaveCount(count);

    if (testInfo.project.name === "mobile") {
      const display = await blocks
        .first()
        .evaluate((el) => getComputedStyle(el).flexDirection);
      expect(display).toBe("column");
      return;
    }

    const header = blocks.first().locator("[data-project-header]");
    const content = blocks.first().locator("[data-project-content]");
    await expect(header).toHaveCSS("position", "sticky");

    const layout = await blocks.first().evaluate((block) => {
      const headerElement = block.querySelector("[data-project-header]");
      const contentElement = block.querySelector("[data-project-content]");
      if (!headerElement || !contentElement) return null;
      const blockRect = block.getBoundingClientRect();
      const headerRect = headerElement.getBoundingClientRect();
      const contentRect = contentElement.getBoundingClientRect();
      return {
        gutter: contentRect.left - headerRect.right,
        rightInset: blockRect.right - contentRect.right,
      };
    });
    expect(layout).not.toBeNull();
    expect(layout?.gutter).toBeGreaterThan(100);
    expect(layout?.rightInset).toBeGreaterThanOrEqual(31);
    expect(layout?.rightInset).toBeLessThanOrEqual(33);
    await expect(content.locator("[data-media-row]").first()).toBeVisible();

    const rowGaps = await content.locator("[data-media-row]").evaluateAll((rows) =>
      rows.slice(1).map((row, index) => {
        const previousMedia = rows[index].querySelectorAll(
          ".relative.overflow-hidden",
        );
        const currentMedia = row.querySelectorAll(".relative.overflow-hidden");
        const previousBottom = Math.max(
          ...Array.from(previousMedia, (media) => media.getBoundingClientRect().bottom),
        );
        const currentTop = Math.min(
          ...Array.from(currentMedia, (media) => media.getBoundingClientRect().top),
        );
        return currentTop - previousBottom;
      }),
    );
    for (const gap of rowGaps) expect(gap).toBeGreaterThan(16);

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
