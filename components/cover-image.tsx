"use client";

import { PostCover } from "@/lib/post-metadata";
import { useEffect, useRef } from "react";

export default function CoverImage({ cover }: { cover: PostCover }) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const image = ref.current!;
    image.src = cover.path;
    image.style.transform = "";
    image.style.filter = "";
  }, []);

  return (
    <div className="overflow-hidden w-full h-full">
      <img
        className="w-full h-full object-cover"
        ref={ref}
        src={cover.blur}
        style={{
          transform: "scale(1.05)",
          filter: "blur(16px)",
        }}
      />
    </div>
  );
}
