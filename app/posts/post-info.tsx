"use client";

import { Post } from "@/lib/post-metadata";
import { wordsToMinutes } from "@/lib/reading-time";

export default function PostInfo({
  post,
  verboseDate = false,
}: {
  post: Post;
  verboseDate?: boolean;
}) {
  const published = post.published.toLocaleDateString();
  const edited = post.lastModified.toLocaleDateString();

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <div className="flex flex-wrap grow">
        {verboseDate ? (
          <>
            Published {published}
            {edited !== published ? (
              <>
                <Divider />
                Edited {edited}
              </>
            ) : null}
          </>
        ) : (
          post.published.toLocaleDateString()
        )}
        <Divider />
        {wordsToMinutes(post.wordCount)} minute read
      </div>

      <PostKeywords keywords={post.keywords} />
    </div>
  );
}

function Divider() {
  return <span className="mx-2 border-l border-stone-400" />;
}

function PostKeywords({ keywords: tags }: { keywords: string[] }) {
  return (
    <span className="inline-flex flex-wrap justify-evenly gap-2">
      {tags.map((tag) => (
        <span
          className="fredoka px-1 rounded uppercase text-white font-bold bg-pink-600"
          key={tag}
        >
          {tag}
        </span>
      ))}
    </span>
  );
}
