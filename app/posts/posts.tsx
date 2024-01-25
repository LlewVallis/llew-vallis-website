"use client";

import { Post, Posts } from "@/lib/post-metadata";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

type SortMode = "newest" | "oldest" | "alphabetical";

export default function Posts({ posts }: { posts: Posts }) {
  const [sortMode, setSortMode] = useState<SortMode>("newest");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = useMemo(
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

      {JSON.stringify(filteredPosts)}
    </>
  );
}

function sortPosts(posts: Post[], mode: SortMode, search: string): Post[] {
  if (search !== "") {
    const preSorted = sortByKey(posts, (post) => post.published).reverse();

    const fuse = new Fuse(preSorted, {
      keys: [{ name: "title", weight: 2 }, "description", "tags"],
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
    <div className="flex justify-between items-center border-b-2 border-dotted">
      <h1 className="fredoka font-semibold text-6xl">Blog posts</h1>
      <div className="flex gap-4">
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
      className="h-10 px-2 border rounded-lg bg-stone-200"
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
      className="h-10 px-2 border rounded-lg bg-stone-200"
    />
  );
}
