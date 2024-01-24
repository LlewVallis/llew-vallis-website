import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import wrapMarkdown from "./mdx-plugins/wrap-markdown-plugin.mjs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: [
      remarkMath,
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "metadata" }],
      wrapMarkdown,
    ],
    rehypePlugins: [
      [rehypePrism, { showLineNumbers: true }],
      rehypeSlug,
      rehypeAutolinkHeadings,
      rehypeKatex,
    ],
  },
});

export default withMDX(nextConfig);
