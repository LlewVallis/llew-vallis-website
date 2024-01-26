import { Post } from "@/lib/post-metadata";

const WORDS_PER_MINUTE = 250;

export default function PostInfo({ post }: { post: Post }) {
  const readTime = Math.ceil(post.wordCount / WORDS_PER_MINUTE);

  return <div>{readTime} minute read</div>;
}
