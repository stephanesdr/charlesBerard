import {
  CanvasTexture,
  LinearFilter,
  SRGBColorSpace,
  type Texture,
} from "three";

export const ABOUT_HERO_ROTATION = -13.47;

type TextTextureOptions = {
  width: number;
  height: number;
  dpr: number;
  lines: readonly [string, string];
  fontFamily: string;
  color: string;
};

export type AboutHeroTextures = {
  text: Texture;
  shadow: Texture;
};

function createCanvas(width: number, height: number, dpr: number) {
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable.");
  context.scale(dpr, dpr);
  return { canvas, context };
}

function drawHeroText(
  context: CanvasRenderingContext2D,
  options: TextTextureOptions,
  shadow: boolean,
) {
  const { width, height, lines, fontFamily, color } = options;
  const fontSize = Math.min(122.347, Math.max(48, width * 0.08092));
  const lineHeight = fontSize * 1.208;
  const originX = width * 0.283;
  const originY = height * 0.5837;

  context.save();
  context.translate(originX, originY);
  context.rotate((ABOUT_HERO_ROTATION * Math.PI) / 180);
  context.font = `700 ${fontSize}px ${fontFamily}`;
  context.textBaseline = "top";
  context.fillStyle = shadow ? "rgb(33 42 55 / 0.3)" : color;

  if (shadow) {
    context.shadowColor = "rgb(33 42 55 / 0.35)";
    context.shadowBlur = Math.max(10, fontSize * 0.15);
    context.shadowOffsetX = Math.max(8, fontSize * 0.09);
    context.shadowOffsetY = Math.max(12, fontSize * 0.13);
  }

  context.fillText(lines[0], 0, 0);
  context.fillText(lines[1], width * 0.0416, lineHeight * 0.73);
  context.restore();
}

function toTexture(canvas: HTMLCanvasElement) {
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

export function createAboutHeroTextures(
  options: TextTextureOptions,
): AboutHeroTextures {
  const textCanvas = createCanvas(options.width, options.height, options.dpr);
  drawHeroText(textCanvas.context, options, false);

  const shadowCanvas = createCanvas(options.width, options.height, options.dpr);
  drawHeroText(shadowCanvas.context, options, true);

  return {
    text: toTexture(textCanvas.canvas),
    shadow: toTexture(shadowCanvas.canvas),
  };
}
