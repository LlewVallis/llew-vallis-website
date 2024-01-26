import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import wrapMarkdown from "./plugins/wrap-markdown-plugin.mjs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypePrism from "rehype-prism-plus";
import exportMetdata from "./plugins/export-metadata.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx"],
};

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      exportMetdata,
      wrapMarkdown,
    ],
    rehypePlugins: [
      rehypeKatex,
      [rehypePrism, { showLineNumbers: true }],
      rehypeSlug,
      rehypeAutolinkHeadings,
    ],
  },
});

export default withMDX(nextConfig);
