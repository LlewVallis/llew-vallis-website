import loadPostMetadata from "@/lib/post-metadata";
import Posts from "./posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Llew Vallis' blog posts, thoughts, and other assorted writings.",
};

export default async function Page() {
  const posts = await loadPostMetadata();

  return (
    <main className="mx-20 mt-10">
      <Posts posts={posts} />
    </main>
  );
}
