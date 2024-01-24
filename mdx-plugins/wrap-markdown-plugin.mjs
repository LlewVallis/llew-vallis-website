export default function wrapMarkdown() {
  return (ast) => {
    ast.children.push(structuredClone(SNIPPET));
  };
}

const SNIPPET = {
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
                name: "MarkdownWrapper",
              },
            },
          ],
          source: {
            type: "Literal",
            value: "@/components/markdown-wrapper",
            raw: '"@/components/markdown-wrapper"',
          },
        },
        {
          type: "ExportDefaultDeclaration",
          declaration: {
            type: "ArrowFunctionExpression",
            id: null,
            expression: true,
            generator: false,
            async: false,
            params: [
              {
                type: "ObjectPattern",
                properties: [
                  {
                    type: "Property",
                    method: false,
                    shorthand: true,
                    computed: false,
                    key: {
                      type: "Identifier",
                      name: "children",
                    },
                    kind: "init",
                    value: {
                      type: "Identifier",
                      name: "children",
                    },
                  },
                ],
              },
            ],
            body: {
              type: "JSXElement",
              openingElement: {
                type: "JSXOpeningElement",
                attributes: [
                  {
                    type: "JSXAttribute",
                    name: {
                      type: "JSXIdentifier",
                      name: "metadata",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      expression: {
                        type: "Identifier",
                        name: "metadata",
                      },
                    },
                  },
                ],
                name: {
                  type: "JSXIdentifier",
                  name: "MarkdownWrapper",
                },
                selfClosing: false,
              },
              closingElement: {
                type: "JSXClosingElement",
                name: {
                  type: "JSXIdentifier",
                  name: "MarkdownWrapper",
                },
              },
              children: [
                {
                  type: "JSXExpressionContainer",
                  expression: {
                    type: "Identifier",
                    name: "children",
                  },
                },
              ],
            },
          },
        },
      ],
      sourceType: "module",
      comments: [],
    },
  },
};
