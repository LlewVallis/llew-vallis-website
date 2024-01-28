"use client";

import { Post, Posts } from "@/lib/post-metadata";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import Link from "next/link";
import OptimizedImage from "../../components/optimized-image";
import PostInfo from "./post-info";

type SortMode = "newest" | "oldest" | "alphabetical";

export default function Posts({ posts }: { posts: Posts }) {
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const sortedPosts = useMemo(
    () => sortPosts(Object.values(posts.bySlug), sortMode, searchTerm),
    [posts, sortMode, searchTerm],
  );

  return (
    <>
      <Header
        disableSort={searchTerm !== ""}
        setSortMode={setSortMode}
        setSearchTerm={setSearchTerm}
      />

      <PostList posts={sortedPosts} />
    </>
  );
}

function sortPosts(posts: Post[], mode: SortMode, search: string): Post[] {
  if (search !== "") {
    const preSorted = sortByKey(posts, (post) => post.published).reverse();

    const fuse = new Fuse(preSorted, {
      keys: [{ name: "title", weight: 2 }, "description", "keywords"],
      threshold: 0.35,
    });

    const results = fuse.search(search);
    return results.map((result) => result.item);
  }

  switch (mode) {
    case "newest":
      return sortByKey(posts, (post) => post.published).reverse();
    case "oldest":
      return sortByKey(posts, (post) => post.published);
    case "alphabetical":
      return sortByKey(posts, (post) => post.title);
    default:
      return posts;
  }
}

function sortByKey<T, K>(elements: T[], f: (element: T) => K): T[] {
  return elements.toSorted((a, b) => {
    const keyA = f(a);
    const keyB = f(b);
    return keyA < keyB ? -1 : keyA > keyB ? 1 : 0;
  });
}

function Header({
  disableSort,
  setSortMode,
  setSearchTerm,
}: {
  disableSort: boolean;
  setSortMode: (mode: SortMode) => void;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center pb-4 border-b border-stone-400 border-dashed">
      <h1 className="text-nowrap fredoka font-semibold text-5xl">Blog posts</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <SortMode disabled={disableSort} setSortMode={setSortMode} />
        <Search setSearchTerm={setSearchTerm} />
      </div>
    </div>
  );
}

function SortMode({
  disabled,
  setSortMode,
}: {
  disabled: boolean;
  setSortMode: (mode: SortMode) => void;
}) {
  return (
    <select
      onChange={(e) => setSortMode(e.currentTarget.value as SortMode)}
      disabled={disabled}
      className="h-10 px-2 rounded-lg bg-stone-200 shadow cursor-pointer"
    >
      <option value="newest">Newest first</option>
      <option value="oldest">Oldest first</option>
      <option value="alphabetical">Alphabetical</option>
    </select>
  );
}

function Search({ setSearchTerm }: { setSearchTerm: (term: string) => void }) {
  return (
    <input
      onChange={(e) => setSearchTerm(e.currentTarget.value.trim())}
      placeholder="Search posts"
      className="h-10 px-2 rounded-lg bg-stone-200 shadow"
    />
  );
}

function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="grid my-4 gap-8 xl:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function PostCard({ post }: { post: Post }) {
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
