import loadPostMetadata, { Post } from "@/lib/post-metadata";
import { ReactNode } from "react";

const WORDS_PER_MINUTE = 250;

export default async function MarkdownWrapper({
  children,
  slug,
}: {
  children: ReactNode;
  slug: string;
}) {
  const posts = await loadPostMetadata();
  const post = posts.bySlug[slug];

  return (
    <main className="pad-page">
      <div className="pt-8 max-w-screen-md mx-auto">
        <Header post={post} />

        <div className="md-content">
          {children}
        </div>
      </div>
    </main>
  );
}

function Header({ post }: { post: Post }) {
  const readTime = Math.ceil(post.wordCount / WORDS_PER_MINUTE);

  return (
    <div className="flex justify-between items-baseline pb-2 mb-4 border-b border-dashed border-stone-400">
      <h1 className="fredoka font-semibold text-3xl">{post.title}</h1>
      <div className="">
        {readTime} minute read
      </div>
    </div>
  );
}
