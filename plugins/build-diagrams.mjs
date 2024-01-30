import { visit } from "unist-util-visit";
import { instance } from "@viz-js/viz";

export default function buildDiagrams() {
  return async (ast) => {
    const viz = await instance();

    ast.children.unshift(structuredClone(IMPORT_SNIPPET));

    visit(ast, "code", (ast) => {
      if (ast.lang !== "diagram") return;

      const svg = viz.renderString(ast.value, {
        format: "svg",
        graphAttributes: {
          bgcolor: "transparent",
        },
      });

      const newNode = buildDiagramSnippet(svg);

      Object.keys(ast).forEach((key) => delete ast[key]);
      Object.assign(ast, newNode);
    });
  };
}

const buildDiagramSnippet = (svg) => ({
  type: "mdxJsxFlowElement",
  name: "MarkdownDiagram",
  attributes: [],
  children: [
    {
      type: "text",
      value: svg,
    },
  ],
  data: { _mdxExplicitJsx: true },
});

const IMPORT_SNIPPET = {
  type: "mdxjsEsm",
  value: "",
  data: {
    estree: {
      type: "Program",
      body: [
        {
          type: "ImportDeclaration",
          specifiers: [
            {
              type: "ImportDefaultSpecifier",
              local: {
                type: "Identifier",
                name: "MarkdownDiagram",
              },
            },
          ],
          source: {
            type: "Literal",
            value: "@/app/posts/markdown-diagram",
            raw: '"@/app/posts/markdown-diagram"',
          },
        },
      ],
      sourceType: "module",
      comments: [],
    },
  },
};
