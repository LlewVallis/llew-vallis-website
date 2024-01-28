import { Post } from "@/lib/post-metadata";
import Link from "next/link";
import OptimizedImage from "../../components/optimized-image";
import PostInfo from "./post-info";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className="block rounded overflow-hidden bg-stone-200 shadow transition hover:translate-y-[-4px]"
    >
      <div className="flex h-[250px]">
        <div className="flex flex-col p-4 pb-2 flex-grow">
          <div className="border-b border-dashed border-stone-400 pb-2 mb-2">
            <h2 className="fredoka font-semibold text-lg mb-2">{post.title}</h2>

            <div className="text-sm">
              <PostInfo post={post} />
            </div>
          </div>

          <p className="line-clamp-4">{post.description}</p>

          <div className="flex-grow" />

          <div className="text-center text-pink-600 font-semibold select-none">
            Read more &#10230;
          </div>
        </div>

        {post.cover !== undefined ? (
          <div className="aspect-square hidden md:block">
            <OptimizedImage image={post.cover} mode="fill" />
          </div>
        ) : null}
      </div>
    </Link>
  );
}
