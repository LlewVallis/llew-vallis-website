import { visit } from "unist-util-visit";

export default function demoteHeadings() {
  return (ast) => {
    visit(ast, "heading", (heading) => {
      heading.depth = Math.min(heading.depth + 1, 6);
    });
  };
}
