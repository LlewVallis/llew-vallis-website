import loadPostMetadata from "@/lib/post-metadata";

export default async function Page() {
  const posts = await loadPostMetadata();

  return (
    <ul>
      {Object.values(posts.bySlug).map((post) => (
        <a key={post.slug} href={`/posts/${post.slug}`}>
          <code>{JSON.stringify(post)}</code>
        </a>
      ))}
    </ul>
  );
}
