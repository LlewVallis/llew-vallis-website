import { loadOptimizedImage } from "@/lib/image-optimize";
import OptimizedImage from "@/components/optimized-image";

export default async function MarkdownImage({
  slug,
  src,
  alt,
  title,
}: {
  slug: string;
  src: string;
  alt: string;
  title: string | null;
}) {
  const image = await loadOptimizedImage(slug, src, alt);

  return (
    <div className="my-8">
      <div className="rounded overflow-hidden shadow">
        <OptimizedImage image={image} mode="wide" />
      </div>
      {title !== null ? <div className="mt-2 italic text-center">{title}</div> : null}
    </div>
  );
}
