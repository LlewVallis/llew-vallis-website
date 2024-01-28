"use client";

import { Post, Posts } from "@/lib/post-metadata";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { PostCard } from "./post-card";

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

      {posts.length === 0 ? (
        <div className="col-span-2 text-center text-xl mt-10">
          No results found
        </div>
      ) : null}
    </div>
  );
}
