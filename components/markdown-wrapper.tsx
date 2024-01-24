import loadPostMetadata from "@/lib/post-metadata";
import { ReactNode } from "react";

export default async function MarkdownWrapper({
  children,
  metadata: { slug },
}: {
  children: ReactNode;
  metadata: { slug: string };
}) {
  const posts = await loadPostMetadata();
  const post = posts.bySlug[slug];

  return (
    <>
      <code>{JSON.stringify(post)}</code>

      {children}
    </>
  );
}
