import { visit } from "unist-util-visit";
import { valueToEstree } from "estree-util-value-to-estree";

export default function optimizeImages() {
  return (ast) => {
    ast.children.unshift(structuredClone(IMPORT_SNIPPET));

    visit(ast, "paragraph", (paragraph) => {
      if (paragraph.children.length !== 1) return;
      if (paragraph.children[0].type !== "image") return;

      const image = paragraph.children[0];
      const newNode = buildImageSnippet(image.url, image.alt, image.title);

      Object.keys(paragraph).forEach((key) => delete paragraph[key]);
      Object.assign(paragraph, newNode);
    });
  };
}

const buildImageSnippet = (src, alt, title) => ({
  type: "mdxJsxFlowElement",
  name: "MarkdownImage",
  attributes: [
    {
      type: "mdxJsxAttribute",
      name: "slug",
      value: {
        type: "mdxJsxAttributeValueExpression",
        value: "",
        data: {
          estree: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "MemberExpression",
                  object: {
                    type: "Identifier",
                    name: "frontmatter",
                  },
                  property: {
                    type: "Identifier",
                    name: "slug",
                  },
                  computed: false,
                  optional: false,
                },
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      },
    },
    {
      type: "mdxJsxAttribute",
      name: "src",
      value: {
        type: "mdxJsxAttributeValueExpression",
        value: "",
        data: {
          estree: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: valueToEstree(src),
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      },
    },
    {
      type: "mdxJsxAttribute",
      name: "alt",
      value: {
        type: "mdxJsxAttributeValueExpression",
        value: '"ALT"',
        data: {
          estree: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: valueToEstree(alt),
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      },
    },
    {
      type: "mdxJsxAttribute",
      name: "title",
      value: {
        type: "mdxJsxAttributeValueExpression",
        value: '"TITLE"',
        data: {
          estree: {
            type: "Program",
            body: [
              {
                type: "ExpressionStatement",
                expression: valueToEstree(title),
              },
            ],
            sourceType: "module",
            comments: [],
          },
        },
      },
    },
  ],
  children: [],
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
                name: "MarkdownImage",
              },
            },
          ],
          source: {
            type: "Literal",
            value: "@/app/posts/markdown-image",
            raw: '"@/app/posts/markdown-image"',
          },
        },
      ],
      sourceType: "module",
      comments: [],
    },
  },
};
