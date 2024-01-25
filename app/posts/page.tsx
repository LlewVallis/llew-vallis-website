import loadPostMetadata from "@/lib/post-metadata";
import Posts from "./posts";

export default async function Page() {
  const posts = await loadPostMetadata();

  return (
    <main className="mx-40 mt-20">
      <Posts posts={posts} />
    </main>
  );
}
