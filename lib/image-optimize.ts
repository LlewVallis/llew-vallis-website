"use server";

import { OptimizedImage } from "@/components/optimized-image";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const IMAGES_DIR = "public/posts";

export async function loadOptimizedImage(
  slug: string,
  name: string,
  alt: string,
): Promise<OptimizedImage> {
  const imagePath = path.join(IMAGES_DIR, slug, name);
  const imageData = await fs.readFile(imagePath);

  const image = sharp(imageData);
  const metadata = await image.metadata();
  const blurBuffer = await image.resize(32).jpeg().toBuffer();
  const base64 = blurBuffer.toString("base64");

  return {
    src: "/" + path.join("posts", slug, name),
    blur: `data:image/jpeg;base64,${base64}`,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    alt,
  };
}
