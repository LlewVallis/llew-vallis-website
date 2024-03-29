import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import wrapMarkdown from "./plugins/wrap-markdown-plugin.mjs";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStarryNight from "@microflash/rehype-starry-night";
import exportMetdata from "./plugins/export-metadata.mjs";
import demoteHeadings from "./plugins/demote-headings.mjs";
import optimizeImages from "./plugins/optimize-images.mjs";
import buildDiagrams from "./plugins/build-diagrams.mjs";

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx"],
  webpack: (config) => {
    config.resolve.symlinks = false;
    return config;
  },
};

const withMDX = createMDX({
  options: {
    jsx: true,
    remarkPlugins: [
      demoteHeadings,
      optimizeImages,
      buildDiagrams,
      remarkGfm,
      remarkMath,
      remarkFrontmatter,
      remarkMdxFrontmatter,
      exportMetdata,
      wrapMarkdown,
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeStarryNight,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
