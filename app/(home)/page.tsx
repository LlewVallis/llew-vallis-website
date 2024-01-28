import loadPostMetadata, { Post } from "@/lib/post-metadata";
import Hero from "./hero";
import { PostCard } from "../posts/post-card";

export default async function Page() {
  const postData = await loadPostMetadata();
  const posts = Object.values(postData.bySlug);

  posts.sort((a, b) =>
    a.published < b.published ? -1 : a.published > b.published ? 1 : 0,
  );

  const latest: Post | undefined = posts[0];

  return (
    <>
      <Hero />

      <main className="pad-page flex justify-center">
        <div className="mt-2 max-w-5xl">
          <h2 className="fredoka font-semibold text-5xl border-b pb-2 mb-4 border-stone-400 border-dashed">
            Check out my latest blog post
          </h2>

          {latest ? <PostCard post={latest} /> : null}
        </div>
      </main>
    </>
  );
}
