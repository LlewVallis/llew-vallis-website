"use client";

import { useEffect, useRef } from "react";

export type ImageMode = "fill" | "wide";

export interface OptimizedImage {
  src: string;
  blur: string;
  width: number;
  height: number;
  alt: string;
}

export default function OptimizedImage({
  image,
  mode,
}: {
  image: OptimizedImage;
  mode: ImageMode;
}) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    ref.current!.src = image.src;
  }, [image.src]);

  let height = "";
  let aspectRatio = "";

  switch (mode) {
    case "fill":
      height = "100%";
      break;
    case "wide":
      aspectRatio = `${image.width / image.height}`;
      break;
  }

  return (
    <div
      className="overflow-hidden w-full"
      style={{
        height,
        aspectRatio,
      }}
    >
      {/*eslint-disable-next-line @next/next/no-img-element*/}
      <img
        className="w-full h-full object-cover"
        ref={ref}
        src={image.blur}
        alt={image.alt}
        onLoad={(e) => {
          const imageElement = e.currentTarget;
          imageElement.style.transform = "";
          imageElement.style.filter = "";
        }}
        style={{
          transform: "scale(1.05)",
          filter: "blur(16px)",
        }}
      />
    </div>
  );
}
