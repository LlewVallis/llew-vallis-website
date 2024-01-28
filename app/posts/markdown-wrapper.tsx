import loadPostMetadata, { Post } from "@/lib/post-metadata";
import { ReactNode } from "react";
import OptimizedImage from "../../components/optimized-image";

import "./markdown.css";

import "katex/dist/katex.css";

import "@wooorm/starry-night/style/core";
import "@wooorm/starry-night/style/dark";
import PostInfo from "./post-info";

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
        {post.cover !== undefined ? (
          <div className="mb-16 rounded overflow-hidden shadow">
            <OptimizedImage image={post.cover!} mode="wide" />
          </div>
        ) : null}

        <Header post={post} />

        <div className="md-content">{children}</div>
      </div>
    </main>
  );
}

function Header({ post }: { post: Post }) {
  return (
    <div className="pb-2 mb-4 border-b border-dashed border-stone-400">
      <h1 className="fredoka font-semibold text-4xl mb-3">{post.title}</h1>

      <PostInfo post={post} verboseDate />
    </div>
  );
}
