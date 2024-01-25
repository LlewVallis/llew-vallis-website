"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = "app/posts";
const SLUG_REGEX = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/;

export interface Posts {
  bySlug: Record<string, Post>;
  byTag: Record<string, string[]>;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  published: Date;
  lastModified: Date;
  tags: string[];
}

export default async function loadPostMetadata(): Promise<Posts> {
  const results: Posts = {
    bySlug: {},
    byTag: {},
  };

  const files = await fs.readdir(POSTS_DIR, {
    withFileTypes: true,
    recursive: true,
  });

  for (const file of files) {
    if (file.name !== "page.mdx") continue;

    const filePath = path.join(file.path, file.name);

    let post: Post;
    try {
      post = await loadPost(filePath);
    } catch (e) {
      console.error(`Error loading post for '${filePath}'`, e);
      continue;
    }

    results.bySlug[post.slug] = post;

    for (const tag of post.tags) {
      if (!(tag in results.byTag)) {
        results.byTag[tag] = [];
      }

      results.byTag[tag].push(post.slug);
    }
  }

  return results;
}

async function loadPost(filePath: string): Promise<Post> {
  const slug = path.relative(POSTS_DIR, path.dirname(filePath));

  if (!SLUG_REGEX.test(slug)) {
    throw new Error(`invalid slug '${slug}}'`);
  }

  const content = await fs.readFile(filePath).then((buf) => buf.toString());
  const { data } = matter(content);

  if (data.slug !== slug) {
    throw new Error("wrong slug");
  }

  if (typeof data.title !== "string") {
    throw new Error("invalid title");
  }

  if (typeof data.description !== "string") {
    throw new Error("invalid description");
  }

  if (!(data.published instanceof Date)) {
    throw new Error("invalid published time");
  }

  if (data.lastModified !== undefined && !(data.lastModified instanceof Date)) {
    throw new Error("invalid last modified time");
  }

  if (data.tags !== undefined && !(data.tags instanceof Array)) {
    throw new Error("invalid tags");
  }

  for (const tag of data.tags ?? []) {
    if (typeof tag !== "string") {
      throw new Error("invalid tag");
    }
  }

  return {
    slug,
    title: data.title,
    description: data.description,
    published: data.published,
    lastModified: data.lastModified ?? data.published,
    tags: (data.tags ?? []).toSorted(),
  };
}
