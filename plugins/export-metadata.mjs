const PROPAGATE = ["title", "description"];

export default function exportMetdata() {
  return (ast) => {
    ast.children.push(structuredClone(SNIPPET));
  };
}

const SNIPPET = {
  type: "Program",
  body: [
    {
      type: "ExportNamedDeclaration",
      declaration: {
        type: "VariableDeclaration",
        declarations: [
          {
            type: "VariableDeclarator",
            id: {
              type: "Identifier",
              name: "metadata",
            },
            init: {
              type: "ObjectExpression",
              properties: PROPAGATE.map((field) => [
                {
                  type: "Property",
                  method: false,
                  shorthand: false,
                  computed: false,
                  key: {
                    type: "Identifier",
                    name: field,
                  },
                  value: {
                    type: "MemberExpression",
                    object: {
                      type: "Identifier",
                      name: "frontmatter",
                    },
                    property: {
                      type: "Identifier",
                      name: field,
                    },
                    computed: false,
                    optional: false,
                  },
                  kind: "init",
                },
              ]),
            },
          },
        ],
        kind: "const",
      },
      specifiers: [],
      source: null,
    },
  ],
  sourceType: "module",
  comments: [],
};
