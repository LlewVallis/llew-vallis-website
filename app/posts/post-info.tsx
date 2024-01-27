import { Post } from "@/lib/post-metadata";
import { wordsToMinutes } from "@/lib/reading-time";
import { ReactNode } from "react";

export default function PostInfo({
  post,
  title = false,
}: {
  post: Post;
  title?: boolean;
}) {
  return (
    <div
      className="w-full flex flex-wrap items-baseline gap-1 mb-1"
      style={{
        rowGap: title ? "1rem" : "0.5rem",
      }}
    >
      <h2
        className="flex-grow fredoka font-medium"
        style={{
          fontSize: title ? "2rem" : "1.1rem",
          lineHeight: title ? "2rem" : "1.1rem",
        }}
      >
        {post.title}
      </h2>

      <div className="flex flex-wrap items-baseline">
        <PostInfoElement>
          {wordsToMinutes(post.wordCount)} minute read
        </PostInfoElement>
        <PostInfoElement>{post.published.toLocaleDateString()}</PostInfoElement>

        {post.keywords.length > 0 ? (
          <PostInfoElement>
            <span className="capitalize">{post.keywords.join(", ")}</span>
          </PostInfoElement>
        ) : null}
      </div>
    </div>
  );
}

function PostInfoElement({ children }: { children: ReactNode }) {
  return (
    <div className="text-nowrap border-r border-stone-400 px-2 first:pl-0 last:pr-0 last:border-r-0 text-sm">
      {children}
    </div>
  );
}
