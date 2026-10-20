"use client";

import { useEffect, useRef } from "react";
import { AboutHeroScene } from "./aboutHeroScene";
import { createAboutHeroTextures } from "./textTexture";

type AboutShaderCanvasProps = {
  lines: readonly [string, string];
  onReadyChange: (ready: boolean) => void;
};

export function AboutShaderCanvas({
  lines,
  onReadyChange,
}: AboutShaderCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    let scene: AboutHeroScene | null = null;
    let alive = true;
    let resizeFrame: number | null = null;
    const computedStyle = getComputedStyle(container);
    const fontFamily = computedStyle.fontFamily;
    const color =
      computedStyle.getPropertyValue("--color-ink").trim() || "#1f2a37";

    const makeTextures = (width: number, height: number) =>
      createAboutHeroTextures({
        width,
        height,
        dpr: Math.min(window.devicePixelRatio || 1, 1.75),
        lines,
        fontFamily,
        color,
      });

    const resize = () => {
      if (!scene) return;
      const { width, height } = container.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      scene.resize(
        width,
        height,
        window.devicePixelRatio || 1,
        makeTextures(width, height),
      );
    };

    const scheduleResize = () => {
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(resize);
    };

    const handlePointerMove = (event: PointerEvent) => {
      scene?.setPointer(
        event.clientX,
        event.clientY,
        container.getBoundingClientRect(),
      );
    };
    const handlePointerLeave = () => scene?.resetPointer();
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      onReadyChange(false);
    };
    const handleContextRestored = () => onReadyChange(true);

    const resizeObserver = new ResizeObserver(scheduleResize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      scene?.setActive(entry.isIntersecting);
    });

    void document.fonts.ready.then(() => {
      if (!alive) return;
      const { width, height } = container.getBoundingClientRect();
      if (width < 1 || height < 1) return;

      try {
        const initialTextures = makeTextures(width, height);
        scene = new AboutHeroScene(canvas, initialTextures);
        resize();
        resizeObserver.observe(container);
        intersectionObserver.observe(container);
        container.addEventListener("pointermove", handlePointerMove, {
          passive: true,
        });
        container.addEventListener("pointerleave", handlePointerLeave);
        canvas.addEventListener("webglcontextlost", handleContextLost);
        canvas.addEventListener("webglcontextrestored", handleContextRestored);
        onReadyChange(true);
      } catch {
        scene?.dispose();
        scene = null;
        onReadyChange(false);
      }
    });

    return () => {
      alive = false;
      onReadyChange(false);
      if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      scene?.dispose();
    };
  }, [lines, onReadyChange]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 size-full"
      aria-hidden="true"
      data-about-shader
    />
  );
}
