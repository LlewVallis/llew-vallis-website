"use server";

import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { OptimizedImage } from "@/components/optimized-image";
import { loadOptimizedImage } from "./image-optimize";

const POSTS_DIR = "app/posts/(posts)";
const SLUG_REGEX = /^[a-z0-9-]+(\/[a-z0-9-]+)*$/;

export interface Posts {
  bySlug: Record<string, Post>;
  byKeyword: Record<string, string[]>;
}

export interface Post {
  slug: string;
  title: string;
  description: string;
  published: Date;
  lastModified: Date;
  keywords: string[];
  wordCount: number;
  cover?: OptimizedImage;
}

export default async function loadPostMetadata(): Promise<Posts> {
  const results: Posts = {
    bySlug: {},
    byKeyword: {},
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

    for (const keyword of post.keywords) {
      if (!(keyword in results.byKeyword)) {
        results.byKeyword[keyword] = [];
      }

      results.byKeyword[keyword].push(post.slug);
    }
  }

  return results;
}

async function loadPost(filePath: string): Promise<Post> {
  const slug = path.relative(POSTS_DIR, path.dirname(filePath));

  if (!SLUG_REGEX.test(slug)) {
    throw new Error(`invalid slug '${slug}}'`);
  }

  const file = await fs.readFile(filePath).then((buf) => buf.toString());
  const { data, content } = matter(file);

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

  if (data.keywords !== undefined && !(data.keywords instanceof Array)) {
    throw new Error("invalid keywords");
  }

  for (const tag of data.tags ?? []) {
    if (typeof tag !== "string") {
      throw new Error("invalid tag");
    }
  }

  if (data.cover !== undefined && typeof data.cover !== "string") {
    throw new Error("invalid cover path");
  }

  if (data.cover !== undefined && typeof data.coverAlt !== "string") {
    throw new Error("invalid cover alt");
  }

  const wordCount = content.match(/\b\w+\b/gi)?.length ?? 0;

  const result: Post = {
    slug,
    title: data.title,
    description: data.description,
    published: data.published,
    lastModified: data.lastModified ?? data.published,
    keywords: (data.keywords ?? []).toSorted(),
    wordCount: wordCount,
  };

  if (data.cover !== undefined) {
    result.cover = await loadOptimizedImage(slug, data.cover, data.coverAlt);
  }

  return result;
}
