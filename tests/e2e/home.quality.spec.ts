import { expect, test } from "@playwright/test";

test.describe("home quality", () => {
  test("images, overflow, reduced motion and LCP", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const overflow = await page.evaluate(() => ({
      html: getComputedStyle(document.documentElement).overflow,
      body: getComputedStyle(document.body).overflow,
    }));
    expect(overflow.html).toBe("visible");
    expect(overflow.body).toBe("visible");

    const imageAudit = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll("img"));
      return images.map((img) => ({
        alt: img.getAttribute("alt"),
        sizes: img.getAttribute("sizes"),
        loading: img.getAttribute("loading"),
        fetchpriority: img.getAttribute("fetchpriority"),
      }));
    });

    if (imageAudit.length > 0) {
      for (const image of imageAudit) {
        expect(image.alt).not.toBeNull();
        expect(image.sizes).toBeTruthy();
      }
    }

    await expect(page.locator("[data-lcp='true']")).toHaveCount(1);

    const introMedia = page.locator("[data-home-section='intro-media']");
    const margins = await introMedia.evaluate((section) => {
      const rect = section.getBoundingClientRect();
      return {
        left: rect.left,
        right: window.innerWidth - rect.right,
      };
    });
    expect(Math.abs(margins.left - margins.right)).toBeLessThan(1);

    const firstViewportLayout = await page.evaluate(() => {
      const title = document.querySelector(
        "[data-home-section='hero'] h1",
      )?.getBoundingClientRect();
      const media = document
        .querySelector("[data-home-section='intro-media'] > div")
        ?.getBoundingClientRect();
      const mediaSection = document.querySelector(
        "[data-home-section='intro-media']",
      );
      const marqueeElement = document.querySelector(
        "[data-home-section='marquee']",
      );
      return {
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        titleBottom: title?.bottom ?? 0,
        mediaTop: media?.top ?? 0,
        mediaBottom: media?.bottom ?? 0,
        mediaZIndex: mediaSection ? getComputedStyle(mediaSection).zIndex : "",
        marqueeZIndex: marqueeElement
          ? getComputedStyle(marqueeElement).zIndex
          : "",
      };
    });
    expect(firstViewportLayout.titleBottom).toBeLessThan(
      firstViewportLayout.mediaTop,
    );
    expect(Number(firstViewportLayout.mediaZIndex)).toBeGreaterThan(
      Number(firstViewportLayout.marqueeZIndex),
    );
    if (firstViewportLayout.viewportWidth >= 1100) {
      expect(firstViewportLayout.mediaTop).toBeLessThan(
        firstViewportLayout.viewportHeight * 0.5,
      );
      expect(firstViewportLayout.mediaBottom).toBeGreaterThan(
        firstViewportLayout.viewportHeight,
      );
    }

    const introVideo = introMedia.locator("video");
    if (await introVideo.count()) {
      await expect(introVideo).toHaveJSProperty("paused", true);
      await expect(
        introMedia.getByRole("button", { name: "Play intro video" }),
      ).toBeVisible();
    }

    const caption = page.locator("[data-media-row] p").first();
    if (await caption.count()) {
      await expect(caption).toHaveCSS("font-size", "14px");
    }

    const animatedChars = page.locator("[data-char]");
    if (await animatedChars.count()) {
      const opacity = await animatedChars.first().evaluate((el) =>
        getComputedStyle(el).opacity,
      );
      expect(Number(opacity)).toBeGreaterThan(0.9);
    }

    const color = await page.evaluate(
      () => getComputedStyle(document.body).color,
    );
    expect(color).toBe("rgb(33, 42, 55)");
  });
});
